var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    //    圖表類型 'line'曲線圖、'bar'長條圖、'radar'雷達圖，可參考chart官網
    type: 'bar',
    data: {
        // 資料類別labels
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        // 資料數據
        datasets: [{
            label: '圖表數據',
            // 背景色
            backgroundColor: ['red', 'green', 'blue', 'yellow', 'rgb(222,222,222)', 'black', 'purple'],
            // 線條色
            borderColor: 'rgb(255, 99, 132,0)',
            // 數據
            data: [3, 10, 5, 2, 20, 30, 45]
        }],
        // 自訂標籤
        labels: [
            '紅色',
            '綠色',
            '藍色',
            '黃色',
            '灰色',
            '黑色',
            '紫色'
        ],
    },
    // 自訂選項
    options: {}
});