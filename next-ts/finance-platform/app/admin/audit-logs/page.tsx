'use client';

import { useEffect, useState } from 'react';

type AuditLog = {
  id: number;
  admin_user_id: number | null;
  admin_name: string | null;
  admin_email: string | null;
  action: string;
  target_type: string;
  target_id: number | null;
  description: string | null;
  before_data: string | null;
  after_data: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
};

type Pagination = {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
};

type SearchForm = {
  action: string;
  targetType: string;
  keyword: string;
  startDate: string;
  endDate: string;
};

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0
  });

  const [searchForm, setSearchForm] = useState<SearchForm>({
    action: '',
    targetType: '',
    keyword: '',
    startDate: '',
    endDate: ''
  });

  const [appliedSearch, setAppliedSearch] = useState<SearchForm>({
    action: '',
    targetType: '',
    keyword: '',
    startDate: '',
    endDate: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function loadLogs(pageNumber: number, filters: SearchForm) {
    const params = new URLSearchParams();

    params.set('page', String(pageNumber));
    params.set('limit', '10');

    if (filters.action) params.set('action', filters.action);
    if (filters.targetType) params.set('targetType', filters.targetType);
    if (filters.keyword) params.set('keyword', filters.keyword);
    if (filters.startDate) params.set('startDate', filters.startDate);
    if (filters.endDate) params.set('endDate', filters.endDate);

    const response = await fetch(`/api/admin/audit-logs?${params.toString()}`);
    const data = await response.json();

    console.log('API 응답:', data); // 🔍 디버깅

    if (!response.ok) {
      setMessage(
        typeof data.message === 'string'
          ? data.message
          : '감사 로그 조회에 실패했습니다.'
      );
      return;
    }

    // ✅ logs 안전 처리
    setLogs(Array.isArray(data.logs) ? data.logs : []);

    // ✅ pagination 안전 처리 (핵심)
    setPagination({
      page: data.pagination?.page ?? 1,
      limit: data.pagination?.limit ?? 10,
      totalCount: data.pagination?.totalCount ?? 0,
      totalPages: data.pagination?.totalPages ?? 0
    });
  }

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setMessage('');
        await loadLogs(currentPage, appliedSearch);
      } catch {
        setMessage('감사 로그를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [currentPage, appliedSearch]);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCurrentPage(1);
    setAppliedSearch(searchForm);
  }

  function handleReset() {
    const emptySearch = {
      action: '',
      targetType: '',
      keyword: '',
      startDate: '',
      endDate: ''
    };

    setSearchForm(emptySearch);
    setAppliedSearch(emptySearch);
    setCurrentPage(1);
  }

  function handlePrevPage() {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  }

  function handleNextPage() {
    if (currentPage >= pagination.totalPages) return;
    setCurrentPage(currentPage + 1);
  }

  function handlePageClick(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  if (isLoading) {
    return <main className="page">감사 로그를 불러오는 중입니다.</main>;
  }

  const pageNumbers = Array.from(
    { length: pagination.totalPages },
    (_, index) => index + 1
  );

  return (
    <main className="page">
      <section className="card">
        <h1>관리자 감사 로그 조회</h1>
        <p>관리자가 수행한 주요 작업 이력을 조회합니다.</p>

        <form className="filterGrid" onSubmit={handleSearch}>
          <select
            value={searchForm.action}
            onChange={(e) =>
              setSearchForm({ ...searchForm, action: e.target.value })
            }
          >
            <option value="">전체 작업</option>
            <option value="USER_ROLE_STATUS_UPDATE">사용자 권한/상태 변경</option>
            <option value="USER_PASSWORD_RESET">사용자 비밀번호 재설정</option>
            <option value="USER_DELETE">사용자 삭제</option>
            <option value="ACCOUNT_STATUS_UPDATE">계좌 상태 변경</option>
            <option value="ACCOUNT_CLOSE_REQUEST_APPROVE">계좌 해지 승인</option>
            <option value="ACCOUNT_CLOSE_REQUEST_REJECT">계좌 해지 거절</option>
          </select>

          <select
            value={searchForm.targetType}
            onChange={(e) =>
              setSearchForm({ ...searchForm, targetType: e.target.value })
            }
          >
            <option value="">전체 대상</option>
            <option value="USER">사용자</option>
            <option value="ACCOUNT">계좌</option>
            <option value="ACCOUNT_CLOSE_REQUEST">계좌 해지 요청</option>
          </select>

          <input
            placeholder="관리자명, 이메일, 설명, IP 검색"
            value={searchForm.keyword}
            onChange={(e) =>
              setSearchForm({ ...searchForm, keyword: e.target.value })
            }
          />

          <input
            type="date"
            value={searchForm.startDate}
            onChange={(e) =>
              setSearchForm({ ...searchForm, startDate: e.target.value })
            }
          />

          <input
            type="date"
            value={searchForm.endDate}
            onChange={(e) =>
              setSearchForm({ ...searchForm, endDate: e.target.value })
            }
          />

          <button type="submit">검색</button>
          <button type="button" onClick={handleReset}>
            초기화
          </button>
        </form>

        {/* ✅ message 안전 출력 */}
        {typeof message === 'string' && message && <p>{message}</p>}
      </section>

      <section className="card">
        <h2>감사 로그 목록</h2>

        <p>
          전체 로그 수: {pagination.totalCount}건 / 현재 페이지:{' '}
          {pagination.page} / {pagination.totalPages}
        </p>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>관리자</th>
              <th>작업</th>
              <th>대상</th>
              <th>설명</th>
              <th>변경 전</th>
              <th>변경 후</th>
              <th>IP</th>
              <th>일시</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>
                  {log.admin_name || '-'}
                  <br />
                  {log.admin_email || '-'}
                </td>
                <td>{log.action}</td>
                <td>
                  {log.target_type}
                  <br />
                  {log.target_id || '-'}
                </td>
                <td>{log.description || '-'}</td>
                <td>
                  <pre>{log.before_data || '-'}</pre>
                </td>
                <td>
                  <pre>{log.after_data || '-'}</pre>
                </td>
                <td>{log.ip_address || '-'}</td>
                <td>{log.created_at}</td>
              </tr>
            ))}

            {logs.length === 0 && (
              <tr>
                <td colSpan={9}>감사 로그가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
          >
            이전
          </button>

          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              className={currentPage === pageNumber ? 'activePage' : ''}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            onClick={handleNextPage}
            disabled={currentPage >= pagination.totalPages}
          >
            다음
          </button>
        </div>
      </section>
    </main>
  );
}