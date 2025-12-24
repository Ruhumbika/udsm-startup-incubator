console.log('Deadline Manager script loaded');

class DeadlineManager {
    constructor() {
        console.log('Initializing DeadlineManager...');
        this.deadlineElement = document.querySelector('.pitch-deadline');
        console.log('Deadline element:', this.deadlineElement);
        this.deadlineKey = 'pitchDeadline';
        this.initializeDeadline();
    }

    initializeDeadline() {
        let deadline = localStorage.getItem(this.deadlineKey);
        
        if (!deadline || this.isDeadlinePassed(deadline)) {
            this.setNextDeadline();
        } else {
            this.updateDisplay(deadline);
        }
        
        // Check daily if deadline has passed
        setInterval(() => {
            if (this.isDeadlinePassed(localStorage.getItem(this.deadlineKey))) {
                this.setNextDeadline();
            }
        }, 24 * 60 * 60 * 1000); // Check once per day
    }

    setNextDeadline() {
        const now = new Date();
        let nextDeadline = new Date(now.getFullYear(), now.getMonth() + 1, 15);
        
        // If we're past the 15th, set for next month
        if (now.getDate() > 15) {
            nextDeadline = new Date(now.getFullYear(), now.getMonth() + 2, 15);
        }
        
        const formattedDeadline = nextDeadline.toISOString();
        localStorage.setItem(this.deadlineKey, formattedDeadline);
        this.updateDisplay(formattedDeadline);
    }

    isDeadlinePassed(deadline) {
        return new Date(deadline) < new Date();
    }

    updateDisplay(deadline) {
        if (!this.deadlineElement) return;
        
        const deadlineDate = new Date(deadline);
        const options = { 
            year: 'numeric',
            month: 'short', 
            day: 'numeric' 
        };
        const formattedDate = deadlineDate.toLocaleDateString('en-US', options);
        
        // Calculate days remaining
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const timeDiff = deadlineDate - today;
        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        // Always show remaining days in status
        let status, statusClass, daysText;
        if (daysRemaining < 0) {
            status = `Closed (${Math.abs(daysRemaining)}d ago)`;
            statusClass = 'status-closed';
        } else if (daysRemaining === 0) {
            status = 'Ends Today';
            statusClass = 'status-closing';
        } else if (daysRemaining === 1) {
            status = '1 day left';
            statusClass = 'status-soon';
        } else if (daysRemaining <= 7) {
            status = `${daysRemaining} days left`;
            statusClass = 'status-soon';
        } else {
            status = `${daysRemaining} days left`;
            statusClass = 'status-open';
        }
        
        this.deadlineElement.innerHTML = `
            <div class="deadline-container">
                <div class="deadline-header">
                    <span class="deadline-icon">⏰</span>
                    <span class="deadline-title">Pitch Deadline:</span>
                </div>
                <div class="deadline-date">${formattedDate}</div>
                <span class="deadline-status ${statusClass}">${status}</span>
                ${daysRemaining > 0 ? `
                    <a href="pages/pitch.html" class="deadline-cta">
                        Submit <span class="hide-on-mobile">Your Idea</span>
                    </a>
                ` : ''}
            </div>
        `;
    }
}

// Self-executing function to initialize the manager
(function() {
    console.log('DOM fully loaded, initializing DeadlineManager...');
    new DeadlineManager();
})();
