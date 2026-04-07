let secChart;
let fiveSecChart;
let minChart;

const stockCode = 'FIN001';

let isDashboardLoading = false;
let isSummaryLoading = false;
let isSecLoading = false;
let isFiveSecLoading = false;
let isMinLoading = false;

function numberFormat(value) {
    return Number(value || 0).toLocaleString('ko-KR');
}

function setText(id, value) {
    document.getElementById(id).textContent = value;
}

function setStatus(message) {
    setText('serverTime', message);
}

function setButtonDisabled(buttonId, disabled) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = disabled;
    }
}

function createLineChart(canvasId, labelName) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: labelName,
                data: [],
                borderWidth: 2,
                tension: 0.25,
                fill: false,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false
        }
    });
}

async function requestJson(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function loadSummary() {
    const data = await requestJson(`/api/dashboard/summary?stock_code=${stockCode}`);

    if (!data.success) {
        throw new Error('요약 데이터 조회 실패');
    }

    const summary = data.summary;

    setText('latestPrice', numberFormat(summary.latestPrice));
    setText('changePrice', `${numberFormat(summary.changePrice)} / ${summary.changeRate}%`);
    setText('latestVolume', numberFormat(summary.latestVolume));
    setText('tradeStrength', summary.tradeStrength);
    setText('avgPrice1Min', numberFormat(summary.avgPrice1Min));
    setText('maxPrice1Min', numberFormat(summary.maxPrice1Min));
    setText('minPrice1Min', numberFormat(summary.minPrice1Min));
    setText('totalVolume1Min', numberFormat(summary.totalVolume1Min));
    setText('updatedAt', summary.updatedAt || '-');
}

async function loadUnitData(type) {
    const data = await requestJson(`/api/dashboard/unit?stock_code=${stockCode}&type=${type}`);

    if (!data.success) {
        throw new Error(`${type} 데이터 조회 실패`);
    }

    return data.rows;
}

function updateChart(chart, rows) {
    chart.data.labels = rows.map(row => row.created_at.slice(11, 19));
    chart.data.datasets[0].data = rows.map(row => row.price);
    chart.update();
}

async function loadStats(centerId) {
    const data = await requestJson(`/api/dashboard/stats?stock_code=${stockCode}&center_id=${centerId}`);

    if (!data.success) {
        throw new Error('구간 통계 조회 실패');
    }

    setText('clickTime', data.center.created_at || '-');
    setText('dataCount', numberFormat(data.stats.dataCount));
    setText('avgPrice', numberFormat(data.stats.avgPrice));
    setText('maxPrice', numberFormat(data.stats.maxPrice));
    setText('minPrice', numberFormat(data.stats.minPrice));
    setText('totalVolume', numberFormat(data.stats.totalVolume));
    setText('avgTradeStrength', data.stats.avgTradeStrength);
}

function bindSecChartClick(secRows) {
    secChart.options.onClick = async function(event, elements) {
        if (!elements.length) return;

        const index = elements[0].index;
        const clickedRow = secRows[index];
        if (!clickedRow) return;

        try {
            setStatus(`초단위 그래프 클릭 통계 조회 중... 기준 id=${clickedRow.id}`);
            await loadStats(clickedRow.id);
            setStatus(`초단위 그래프 클릭 통계 조회 완료: ${clickedRow.created_at}`);
        } catch (err) {
            console.error(err);
            setStatus('초단위 그래프 클릭 통계 조회 실패');
        }
    };
}

async function updateSecChartAndStats() {
    const secRows = await loadUnitData('sec');
    updateChart(secChart, secRows);
    bindSecChartClick(secRows);

    if (secRows.length > 0) {
        const lastRow = secRows[secRows.length - 1];
        await loadStats(lastRow.id);
    }
}

async function loadSummaryByButton() {
    if (isSummaryLoading) return;
    isSummaryLoading = true;
    setButtonDisabled('btnSummary', true);

    try {
        setStatus('실시간 요약 조회 중...');
        await loadSummary();
        setStatus('실시간 요약 조회 완료');
    } catch (err) {
        console.error(err);
        setStatus('실시간 요약 조회 실패');
    } finally {
        isSummaryLoading = false;
        setButtonDisabled('btnSummary', false);
    }
}

async function loadSecChartByButton() {
    if (isSecLoading) return;
    isSecLoading = true;
    setButtonDisabled('btnSec', true);

    try {
        setStatus('초단위 데이터 조회 중...');
        await updateSecChartAndStats();
        setStatus('초단위 데이터 조회 완료');
    } catch (err) {
        console.error(err);
        setStatus('초단위 데이터 조회 실패');
    } finally {
        isSecLoading = false;
        setButtonDisabled('btnSec', false);
    }
}

async function loadFiveSecChartByButton() {
    if (isFiveSecLoading) return;
    isFiveSecLoading = true;
    setButtonDisabled('btnFiveSec', true);

    try {
        setStatus('5초 요약 조회 중...');
        const fiveSecRows = await loadUnitData('5sec');
        updateChart(fiveSecChart, fiveSecRows);
        setStatus('5초 요약 조회 완료');
    } catch (err) {
        console.error(err);
        setStatus('5초 요약 조회 실패');
    } finally {
        isFiveSecLoading = false;
        setButtonDisabled('btnFiveSec', false);
    }
}

async function loadMinChartByButton() {
    if (isMinLoading) return;
    isMinLoading = true;
    setButtonDisabled('btnMin', true);

    try {
        setStatus('1분 요약 조회 중...');
        const minRows = await loadUnitData('min');
        updateChart(minChart, minRows);
        setStatus('1분 요약 조회 완료');
    } catch (err) {
        console.error(err);
        setStatus('1분 요약 조회 실패');
    } finally {
        isMinLoading = false;
        setButtonDisabled('btnMin', false);
    }
}

async function refreshDashboardByButton() {
    if (isDashboardLoading) return;
    isDashboardLoading = true;
    setButtonDisabled('btnRefresh', true);

    try {
        setStatus('전체 대시보드 새로고침 중...');

        await loadSummary();
        await updateSecChartAndStats();

        const fiveSecRows = await loadUnitData('5sec');
        updateChart(fiveSecChart, fiveSecRows);

        const minRows = await loadUnitData('min');
        updateChart(minChart, minRows);

        setStatus('전체 대시보드 새로고침 완료');
    } catch (err) {
        console.error(err);
        setStatus('전체 대시보드 새로고침 실패');
    } finally {
        isDashboardLoading = false;
        setButtonDisabled('btnRefresh', false);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    secChart = createLineChart('secChart', '초단위 가격');
    fiveSecChart = createLineChart('fiveSecChart', '5초 평균 가격');
    minChart = createLineChart('minChart', '1분 평균 가격');

    await refreshDashboardByButton();

    setInterval(async () => {
        if (isDashboardLoading || isSummaryLoading || isSecLoading || isFiveSecLoading || isMinLoading) {
            return;
        }
        await refreshDashboardByButton();
    }, 3000);
});