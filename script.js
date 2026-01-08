// 초기 데이터 로드 (브라우저 저장소에서 기존 데이터 가져오기)
let messageList = JSON.parse(localStorage.getItem('amhs_messages')) || [];

// 페이지 로드 시 UI 업데이트
window.onload = updateUI;

function processFiles() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    if (files.length === 0) {
        alert("파일을 선택해주세요.");
        return;
    }

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            
            // AMHS 메시지 파싱 시뮬레이션 (정규식 등으로 발신처/우선순위 추출 가능)
            const isSS = content.includes('SS') || Math.random() > 0.8; 
            
            const newMessage = {
                id: Date.now() + Math.random(),
                time: new Date().toLocaleString(),
                priority: isSS ? 'SS' : 'GG',
                origin: 'RKSSYNYX',
                recipient: 'RKSIYOYX',
                status: 'Completed'
            };

            // 데이터 추가
            messageList.unshift(newMessage);
            
            // 데이터 저장 (localStorage)
            localStorage.setItem('amhs_messages', JSON.stringify(messageList));
            
            updateUI();
        };
        reader.readAsText(file);
    });
}

function updateUI() {
    const totalCountEl = document.getElementById('total-count');
    const priorityCountEl = document.getElementById('priority-count');
    const tbody = document.getElementById('message-table-body');

    // 1. 통계 업데이트
    const ssCount = messageList.filter(m => m.priority === 'SS').length;
    totalCountEl.innerText = messageList.length;
    priorityCountEl.innerText = ssCount;

    // 2. 테이블 업데이트 (최근 10개만 표시)
    tbody.innerHTML = '';
    const recentTen = messageList.slice(0, 10);

    recentTen.forEach(msg => {
        const row = `
            <tr>
                <td>${msg.time}</td>
                <td><span class="${msg.priority === 'SS' ? 'badge-ss' : ''}">${msg.priority}</span></td>
                <td>${msg.origin}</td>
                <td>${msg.recipient}</td>
                <td><span style="color: green;">● ${msg.status}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// 데이터 초기화 (필요시 호출)
function resetData() {
    if(confirm("모든 데이터를 삭제하시겠습니까?")) {
        messageList = [];
        localStorage.removeItem('amhs_messages');
        updateUI();
    }
}