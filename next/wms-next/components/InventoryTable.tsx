import type { InventoryRow } from '../lib/inventoryApi';

type Props = {
  rows: InventoryRow[];
};

export default function InventoryTable({ rows }: Props) {
  return (
    <section className="inventory-panel">
      <h3 className="inventory-panel-title">입/출고 내역</h3>

      <div className="inventory-table-wrap">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>상품이름</th>
              <th>상품분류</th>
              <th>진행상태</th>
              <th>보관위치</th>
              <th>보관기간</th>
              <th>입고일</th>
              <th>출고예정일</th>
              <th>정산예정금액</th>
            </tr>
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows.map(function (row) {
                return (
                  <tr key={row.id}>
                    <td className="product-cell">
                      <div className="product-info">
                        <div className="product-logo">{row.productInitial}</div>
                        <span>{row.productName}</span>
                      </div>
                    </td>
                    <td>{row.category}</td>
                    <td>{row.status}</td>
                    <td>{row.location}</td>
                    <td>{row.storagePeriod}</td>
                    <td>{row.inboundDate}</td>
                    <td>{row.outboundDueDate}</td>
                    <td>{row.expectedAmount}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="empty-row">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="inventory-panel-footer">
        <a href="/">모든 내역 보기</a>
      </div>
    </section>
  );
}