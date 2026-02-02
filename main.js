// Smooth scroll animation trigger
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-in').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// Email form handler
async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonIcon = submitButton.querySelector('i');
    const email = emailInput.value;
    const webhookUrl = 'https://n8n.aaagency.at/webhook/e7aa0a07-407f-44d1-b5bc-6097377a298a';
    const loadingBar = document.getElementById('loading-bar');

    // --- Loading Bar Start ---
    loadingBar.style.width = '0%'; // Reset
    loadingBar.style.background = 'var(--c-accent)';
    setTimeout(() => { loadingBar.style.width = '70%'; }, 10); // Animate start

    // Disable form and show loading state
    emailInput.disabled = true;
    submitButton.disabled = true;
    const originalButtonText = submitButton.innerText;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
        const formData = new URLSearchParams();
        formData.append('email', email);

        console.log('Sending to webhook:', webhookUrl);
        const response = await fetch(webhookUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors', // Temporary fix for CORS issue
        });
        console.log('Request sent (no-cors mode)');

        // Track Meta Pixel Lead event (send immediately after request, regardless of response)
        if (typeof fbq === 'function') {
            fbq('track', 'Lead');
        }

        // Track Google Analytics 4 conversion event
        if (typeof gtag === 'function') {
            gtag('event', 'generate_lead', {
                'event_category': 'waitlist',
                'event_label': 'email_signup'
            });
        }

        // In no-cors mode, we can't check response.ok, assume success if no network error
        console.log('Webhook request completed, showing success message');

        // --- Loading Bar Success ---
        loadingBar.style.width = '100%';
        setTimeout(() => { loadingBar.style.width = '0%'; }, 500);

        try {
            // Handle successful submission
            const ctaContent = form.closest('.cta-content');
            if (!ctaContent) {
                console.error('CTA content not found');
                return;
            }

            const formContainer = ctaContent.querySelector('.email-form');
            const questionsParagraph = ctaContent.querySelector('p[style*="margin-top: 24px"]');

            console.log('Hiding form...');

            // Hide form and questions paragraph
            formContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            formContainer.style.opacity = '0';
            formContainer.style.transform = 'translateY(10px)';
            if (questionsParagraph) {
                questionsParagraph.style.transition = 'opacity 0.3s ease';
                questionsParagraph.style.opacity = '0';
            }

            setTimeout(() => {
                formContainer.style.display = 'none';
                if (questionsParagraph) {
                    questionsParagraph.style.display = 'none';
                }

                let successMessage = ctaContent.querySelector('.form-success');
                if (!successMessage) {
                    successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    ctaContent.appendChild(successMessage);
                }

                successMessage.innerHTML = `<h3>Thank you!</h3><p><strong>${email}</strong> has been added to the waitlist. We'll be in touch soon!</p>`;

                successMessage.style.display = 'block';
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(10px)';
                successMessage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

                setTimeout(() => {
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                }, 50);

            }, 300);
        } catch (domError) {
            console.error('DOM manipulation error:', domError);
            throw domError;
        }

    } catch (error) {
        console.error('Webhook submission error:', error);

        // --- Loading Bar Error ---
        loadingBar.style.background = '#FF6B6B';
        loadingBar.style.width = '100%';
        setTimeout(() => { loadingBar.style.width = '0%'; }, 1000);
        
        // Show an error message to the user
        const ctaContent = form.closest('.cta-content');
        let errorMessage = ctaContent.querySelector('.form-error');
        if (!errorMessage) {
            errorMessage = document.createElement('p');
            errorMessage.className = 'form-error';
            errorMessage.style.color = '#FF6B6B';
            errorMessage.style.marginTop = '16px';
            form.after(errorMessage);
        }
        errorMessage.innerText = 'Something went wrong. Please try again.';

        // Re-enable the form
        emailInput.disabled = false;
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        if (buttonIcon) {
            submitButton.prepend(buttonIcon);
        }
    }
}

const emailForm = document.querySelector('.email-form');
if (emailForm) {
    emailForm.addEventListener('submit', handleSubmit);
}

// --- Consent Banner Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const consentBanner = document.getElementById('consent-banner');
    const acceptBtn = document.getElementById('consent-accept');
    const declineBtn = document.getElementById('consent-decline');

    // Check if consent has already been given
    if (localStorage.getItem('consentStatus')) {
        return; // Do nothing if a choice has been made
    }

    // If no choice has been made, show the banner
    if (consentBanner) {
        consentBanner.style.display = 'flex';
    }

    // Handle Accept
    acceptBtn.addEventListener('click', () => {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
        localStorage.setItem('consentStatus', 'granted');
        consentBanner.style.display = 'none';
    });

    // Handle Decline
    declineBtn.addEventListener('click', () => {
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
        localStorage.setItem('consentStatus', 'denied');
        consentBanner.style.display = 'none';
    });
});
