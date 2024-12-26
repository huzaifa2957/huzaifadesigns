// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');
    const dynamicBreadcrumb = document.querySelector('.dynamic-breadcrumb');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const content = document.getElementById(tab.dataset.tab);
            content.classList.add('active');

            // Update breadcrumb
            if (tab.dataset.tab === 'upload') {
                dynamicBreadcrumb.textContent = '';
            } else {
                dynamicBreadcrumb.textContent = ` > ${tab.textContent}`;
            }
        });
    });

    // File Upload Handling
    const fileInput = document.getElementById('file-upload');
    const fileSelectButton = document.querySelector('.file-select-button');
    const fileName = document.querySelector('.file-name');
    const uploadButton = document.querySelector('.upload-button');

    fileSelectButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileName.textContent = `${fileInput.files.length} file(s) selected`;
            uploadButton.disabled = false;
        } else {
            fileName.textContent = 'No files chosen';
            uploadButton.disabled = true;
        }
    });

    // Processing Queue Data
    const processingData = [
        { id: '1', name: 'Document1.pdf', status: 'Validated', dateSubmitted: '2023-05-14' },
        { id: '2', name: 'Document2.docx', status: 'Failed', dateSubmitted: '2024-08-18' },
        { id: '3', name: 'Document3.xlsx', status: 'Processing', dateSubmitted: '2024-09-22' }
    ];

    // Revision History Data
    const revisionData = [
        { id: '1', name: 'Document1.pdf', version: 'v1', dateModified: '2023-05-14' },
        { id: '2', name: 'Document2.docx', version: 'v2', dateModified: '2024-08-18' },
        { id: '3', name: 'Document3.xlsx', version: 'v3', dateModified: '2024-09-22' }
    ];

    // Populate Processing Queue Table
    const processingQueueBody = document.getElementById('processing-queue-body');
    processingData.forEach(doc => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doc.name}</td>
            <td><span class="status-badge status-${doc.status.toLowerCase()}">${doc.status}</span></td>
            <td>${doc.dateSubmitted}</td>
            <td><button class="action-button" ${doc.status === 'Processing' ? 'disabled' : ''}>Reprocess</button></td>
        `;
        processingQueueBody.appendChild(row);
    });

    // Populate Revision History Table
    const revisionHistoryBody = document.getElementById('revision-history-body');
    revisionData.forEach(doc => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doc.name}</td>
            <td>${doc.version}</td>
            <td>${doc.dateModified}</td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="action-button">View</button>
                    <button class="action-button">Restore</button>
                </div>
            </td>
        `;
        revisionHistoryBody.appendChild(row);
    });

    // Add click handlers for action buttons
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.textContent;
            const row = e.target.closest('tr');
            const documentName = row.cells[0].textContent;
            console.log(`${action} clicked for ${documentName}`);
        });
    });
});