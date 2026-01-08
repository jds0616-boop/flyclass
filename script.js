// 상태 관리 객체 (실제 운영 시에는 Backend API와 연동)
let messageList = [];
let stats = {
    total: 0,
    ssPriority: 0,
    error: 0
};

// 파일 처리 함수
function processFiles() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    if (files.length === 0) {
        alert("파일을 선택해주세요.");
        return;
    }

    // 파일 읽기 시뮬레이션 (AMHS 포맷에 맞춰 파싱 로직 확장 가능)
    for (let file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // 여기에서 AMHS 메시지 포맷(Text/X.400 등)을 분석합니다.
            // 현재는 가상의 데이터를 생성하는 로직으로 대체합니다.
            const newMessage = {
                time: new Date().toLocaleString(),
                priority: Math.random() > 0.7 ? 'SS' : 'GG',
                origin: 'RKSSYNYX',
                recipient: 'RKSIYOYX',
                status: 'Completed'
            };

            addMessage(newMessage);
        };
        reader.readAsText(file);
    }
}

// 메시지 추가 및 10개 유지 로직
function addMessage(msg) {
    // 1. 데이터 저장 (최신순으로 맨 앞에 추가)
    messageList.unshift(msg);
    
    // 2. 통계 업데이트
    stats.total++;
    if (msg.priority === 'SS') stats.ssPriority++;
    
    // 3. UI 업데이트
    updateUI();
}

function updateUI() {
    // 통계 숫자 업데이트
    document.getElementById('total-count').innerText = stats.total;
    document.getElementById('priority-count').innerText = stats.ssPriority;

    const tbody = document.getElementById('message-table-body');
    tbody.innerHTML = '';

    // 최신 10개만 슬라이싱하여 화면에 표시
    const recentTen = messageList.slice(0, 10);

    recentTen.forEach(msg => {
        const row = `
            <tr>
                <td>${msg.time}</td>
                <td><span class="badge ${msg.priority}">${msg.priority}</span></td>
                <td>${msg.origin}</td>
                <td>${msg.recipient}</td>
                <td><span style="color: green;">● ${msg.status}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}