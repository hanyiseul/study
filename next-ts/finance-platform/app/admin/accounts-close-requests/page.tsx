'use client';

import { useEffect, useState } from 'react';

type CloseRequest = {
  id: number;
  account_id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  account_number: string;
  account_name: string;
  balance: string;
  account_status: 'active' | 'closed';
  reason: string | null;
  status: 'pending' | 'approved' | 'rejected';
  admin_memo: string | null;
  requested_at: string;
  processed_at: string | null;
  processed_by: number | null;
  processed_by_name: string | null;
};

type Pagination = {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
};

type SearchForm = {
  status: string;
  keyword: string;
};

export default function AdminAccountCloseRequestsPage() {
  const [requests, setRequests] = useState<CloseRequest[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0
  });

  const [searchForm, setSearchForm] = useState<SearchForm>({
    status: '',
    keyword: ''
  });

  const [appliedSearch, setAppliedSearch] = useState<SearchForm>({
    status: '',
    keyword: ''
  });

  const [adminMemos, setAdminMemos] = useState<Record<number, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function loadRequests(pageNumber: number, filters: SearchForm) {
    const params = new URLSearchParams();

    params.set('page', String(pageNumber));
    params.set('limit', '10');

    if (filters.status) {
      params.set('status', filters.status);
    }

    if (filters.keyword) {
      params.set('keyword', filters.keyword);
    }

    const response = await fetch(
      `/api/admin/account-close-requests?${params.toString()}`
    );

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || '해지 요청 목록 조회에 실패했습니다.');
      return;
    }

    setRequests(data.requests || []);
    setPagination(data.pagination);
  }

  useEffect(function () {
    async function loadData() {
      try {
        setIsLoading(true);
        setMessage('');

        await loadRequests(currentPage, appliedSearch);
      } catch {
        setMessage('해지 요청 목록을 불러오는 중 오류가 발생했습니다.');
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
      status: '',
      keyword: ''
    };

    setSearchForm(emptySearch);
    setAppliedSearch(emptySearch);
    setCurrentPage(1);
  }

  async function handleProcessRequest(
    requestId: number,
    action: 'approve' | 'reject'
  ) {
    const response = await fetch(
      `/api/admin/account-close-requests/${requestId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action,
          adminMemo: adminMemos[requestId] || ''
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || '해지 요청 처리에 실패했습니다.');
      return;
    }

    setMessage(data.message);

    setAdminMemos({
      ...adminMemos,
      [requestId]: ''
    });

    await loadRequests(currentPage, appliedSearch);
  }

  function handlePrevPage() {
    if (currentPage <= 1) {
      return;
    }

    setCurrentPage(currentPage - 1);
  }

  function handleNextPage() {
    if (currentPage >= pagination.totalPages) {
      return;
    }

    setCurrentPage(currentPage + 1);
  }

  function handlePageClick(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  if (isLoading) {
    return <main className="page">해지 요청 목록을 불러오는 중입니다.</main>;
  }

  const pageNumbers = Array.from(
    { length: pagination.totalPages },
    function (_, index) {
      return index + 1;
    }
  );

  return (
    <main className="page">
      <section className="card">
        <h1>관리자 계좌 해지 요청 관리</h1>
        <p>사용자의 계좌 해지 요청을 승인하거나 거절합니다.</p>

        <form className="filterGrid" onSubmit={handleSearch}>
          <select
            value={searchForm.status}
            onChange={function (event) {
              setSearchForm({
                ...searchForm,
                status: event.target.value
              });
            }}
          >
            <option value="">전체 상태</option>
            <option value="pending">승인 대기</option>
            <option value="approved">승인 완료</option>
            <option value="rejected">거절</option>
          </select>

          <input
            placeholder="사용자, 이메일, 계좌번호, 계좌명, 사유 검색"
            value={searchForm.keyword}
            onChange={function (event) {
              setSearchForm({
                ...searchForm,
                keyword: event.target.value
              });
            }}
          />

          <button type="submit">검색</button>

          <button type="button" onClick={handleReset}>
            초기화
          </button>
        </form>

        {message && <p>{message}</p>}
      </section>

      <section className="card">
        <h2>계좌 해지 요청 목록</h2>

        <p>
          전체 요청 수: {pagination.totalCount}건 / 현재 페이지:{' '}
          {pagination.page} / {pagination.totalPages}
        </p>

        <table>
          <thead>
            <tr>
              <th>요청 ID</th>
              <th>사용자</th>
              <th>계좌</th>
              <th>잔액</th>
              <th>계좌 상태</th>
              <th>요청 사유</th>
              <th>요청 상태</th>
              <th>관리자 메모</th>
              <th>요청일</th>
              <th>처리</th>
            </tr>
          </thead>

          <tbody>
            {requests.map(function (request) {
              return (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>
                    {request.user_name}
                    <br />
                    {request.user_email}
                  </td>
                  <td>
                    {request.account_name}
                    <br />
                    {request.account_number}
                  </td>
                  <td>{Number(request.balance).toLocaleString()}원</td>
                  <td>{request.account_status}</td>
                  <td>{request.reason || '-'}</td>
                  <td>{request.status}</td>
                  <td>
                    {request.status === 'pending' ? (
                      <input
                        placeholder="관리자 메모"
                        value={adminMemos[request.id] || ''}
                        onChange={function (event) {
                          setAdminMemos({
                            ...adminMemos,
                            [request.id]: event.target.value
                          });
                        }}
                      />
                    ) : (
                      request.admin_memo || '-'
                    )}
                  </td>
                  <td>{request.requested_at}</td>
                  <td>
                    {request.status === 'pending' ? (
                      <>
                        <button
                          type="button"
                          onClick={function () {
                            handleProcessRequest(request.id, 'approve');
                          }}
                        >
                          승인
                        </button>

                        <button
                          type="button"
                          onClick={function () {
                            handleProcessRequest(request.id, 'reject');
                          }}
                        >
                          거절
                        </button>
                      </>
                    ) : (
                      <span>처리 완료</span>
                    )}
                  </td>
                </tr>
              );
            })}

            {requests.length === 0 && (
              <tr>
                <td colSpan={10}>계좌 해지 요청이 없습니다.</td>
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

          {pageNumbers.map(function (pageNumber) {
            return (
              <button
                key={pageNumber}
                type="button"
                className={currentPage === pageNumber ? 'activePage' : ''}
                onClick={function () {
                  handlePageClick(pageNumber);
                }}
              >
                {pageNumber}
              </button>
            );
          })}

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