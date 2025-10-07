// Quote Generator Application
class QuoteGenerator {
    constructor() {
        this.quotes = [
            {
                id: 0,
                author: "Maya Angelou",
                quote: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
                likes: 0
            },
            {
                id: 1,
                author: "Albert Einstein",
                quote: "Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world.",
                likes: 0
            },
            {
                id: 2,
                author: "Nelson Mandela",
                quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
                likes: 0
            },
            {
                id: 3,
                author: "Steve Jobs",
                quote: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
                likes: 0
            },
            {
                id: 4,
                author: "Oprah Winfrey",
                quote: "The biggest adventure you can take is to live the life of your dreams.",
                likes: 0
            },
            {
                id: 5,
                author: "Walt Disney",
                quote: "The way to get started is to quit talking and begin doing.",
                likes: 0
            },
            {
                id: 6,
                author: "Eleanor Roosevelt",
                quote: "The future belongs to those who believe in the beauty of their dreams.",
                likes: 0
            },
            {
                id: 7,
                author: "Winston Churchill",
                quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
                likes: 0
            }
        ];
        
        this.currentQuoteIndex = -1;
        this.lastGeneratedIndex = -1;
        this.filteredQuotes = [];
        this.currentFilteredIndex = 0;
        this.currentQuote = null;
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Navigation Links
        this.initializeNavigation();
        
        // Generate Quote Button
        document.getElementById('generate-btn').addEventListener('click', () => {
            this.generateRandomQuote();
        });
        
        // Like Button
        document.getElementById('like-btn').addEventListener('click', () => {
            this.toggleLike();
        });
        
        // Statistics Buttons
        document.getElementById('chars-with-spaces').addEventListener('click', () => {
            this.showCharacterCount(true);
        });
        
        document.getElementById('chars-without-spaces').addEventListener('click', () => {
            this.showCharacterCount(false);
        });
        
        document.getElementById('word-count').addEventListener('click', () => {
            this.showWordCount();
        });
        
        // Add Quote Form
        document.getElementById('add-quote-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewQuote();
        });
        
        // Filter Form
        document.getElementById('filter-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.filterQuotesByAuthor();
        });
        
        // Navigation Buttons
        document.getElementById('prev-quote').addEventListener('click', () => {
            this.navigateFilteredQuote('prev');
        });
        
        document.getElementById('next-quote').addEventListener('click', () => {
            this.navigateFilteredQuote('next');
        });
    }
    
    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Scroll to section
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
    }
    
    scrollToSection(sectionId) {
        let targetElement;
        
        switch(sectionId) {
            case 'generate':
                targetElement = document.querySelector('.quote-section');
                break;
            case 'add':
                targetElement = document.querySelector('.add-quote-section');
                break;
            case 'filter':
                targetElement = document.querySelector('.filter-section');
                break;
            case 'stats':
                targetElement = document.querySelector('.stats-section');
                break;
        }
        
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    generateRandomQuote() {
        if (this.quotes.length === 0) {
            this.showMessage('No quotes available!', 'error');
            return;
        }
        
        const generateBtn = document.getElementById('generate-btn');
        generateBtn.classList.add('loading');
        generateBtn.disabled = true;
        
        // Simulate loading for better UX
        setTimeout(() => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * this.quotes.length);
            } while (randomIndex === this.lastGeneratedIndex && this.quotes.length > 1);
            
            this.lastGeneratedIndex = randomIndex;
            this.currentQuoteIndex = randomIndex;
            this.currentQuote = this.quotes[randomIndex];
            
            this.displayQuote(this.currentQuote);
            this.showQuoteActions();
            
            generateBtn.classList.remove('loading');
            generateBtn.disabled = false;
        }, 500);
    }
    
    displayQuote(quote) {
        document.getElementById('quote-text').textContent = quote.quote;
        document.getElementById('quote-author').textContent = `- ${quote.author}`;
        document.getElementById('like-count').textContent = quote.likes;
        
        // Update like button state
        const likeBtn = document.getElementById('like-btn');
        if (quote.likes > 0) {
            likeBtn.classList.add('liked');
        } else {
            likeBtn.classList.remove('liked');
        }
    }
    
    showQuoteActions() {
        document.getElementById('like-btn').style.display = 'inline-flex';
        document.getElementById('stats-section').style.display = 'block';
    }
    
    toggleLike() {
        if (!this.currentQuote) return;
        
        this.currentQuote.likes++;
        document.getElementById('like-count').textContent = this.currentQuote.likes;
        
        const likeBtn = document.getElementById('like-btn');
        likeBtn.classList.add('liked');
        
        // Add animation effect
        likeBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            likeBtn.style.transform = 'scale(1)';
        }, 200);
    }
    
    showCharacterCount(includeSpaces) {
        if (!this.currentQuote) {
            this.showMessage('Please generate a quote first!', 'error');
            return;
        }
        
        const text = this.currentQuote.quote;
        const count = includeSpaces ? text.length : text.replace(/\s/g, '').length;
        const type = includeSpaces ? 'characters (including spaces)' : 'characters (excluding spaces)';
        
        document.getElementById('stats-display').innerHTML = 
            `<i class="fas fa-font"></i> ${count} ${type}`;
    }
    
    showWordCount() {
        if (!this.currentQuote) {
            this.showMessage('Please generate a quote first!', 'error');
            return;
        }
        
        const wordCount = this.currentQuote.quote.trim().split(/\s+/).length;
        document.getElementById('stats-display').innerHTML = 
            `<i class="fas fa-list"></i> ${wordCount} words`;
    }
    
    addNewQuote() {
        const quoteText = document.getElementById('new-quote').value.trim();
        const author = document.getElementById('new-author').value.trim();
        const submitBtn = document.querySelector('#add-quote-form button[type="submit"]');
        
        if (!quoteText || !author) {
            this.showMessage('Please fill in both quote and author fields!', 'error');
            return;
        }
        
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate processing
        setTimeout(() => {
            const newQuote = {
                id: this.quotes.length,
                author: author,
                quote: quoteText,
                likes: 0
            };
            
            this.quotes.push(newQuote);
            
            // Clear form
            document.getElementById('new-quote').value = '';
            document.getElementById('new-author').value = '';
            
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            this.showMessage(`Quote by ${author} added successfully!`, 'success');
        }, 300);
    }
    
    filterQuotesByAuthor() {
        const authorName = document.getElementById('author-filter').value.trim().toLowerCase();
        
        if (!authorName) {
            this.showMessage('Please enter an author name!', 'error');
            return;
        }
        
        this.filteredQuotes = this.quotes.filter(quote => 
            quote.author.toLowerCase().includes(authorName)
        );
        
        if (this.filteredQuotes.length === 0) {
            this.showMessage(`No quotes found for author "${authorName}"`, 'error');
            document.getElementById('filtered-quotes').style.display = 'none';
            return;
        }
        
        this.currentFilteredIndex = 0;
        this.displayFilteredQuote();
        document.getElementById('filtered-quotes').style.display = 'block';
        
        this.showMessage(`Found ${this.filteredQuotes.length} quote(s) by ${authorName}`, 'success');
    }
    
    displayFilteredQuote() {
        const quote = this.filteredQuotes[this.currentFilteredIndex];
        document.getElementById('filtered-quote-text').textContent = quote.quote;
        document.getElementById('filtered-quote-author').textContent = `- ${quote.author}`;
        document.getElementById('quote-counter').textContent = 
            `${this.currentFilteredIndex + 1} / ${this.filteredQuotes.length}`;
        
        // Update navigation buttons
        const prevBtn = document.getElementById('prev-quote');
        const nextBtn = document.getElementById('next-quote');
        
        prevBtn.disabled = this.currentFilteredIndex === 0;
        nextBtn.disabled = this.currentFilteredIndex === this.filteredQuotes.length - 1;
        
        if (prevBtn.disabled) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }
        
        if (nextBtn.disabled) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
    }
    
    navigateFilteredQuote(direction) {
        if (this.filteredQuotes.length === 0) return;
        
        if (direction === 'prev' && this.currentFilteredIndex > 0) {
            this.currentFilteredIndex--;
        } else if (direction === 'next' && this.currentFilteredIndex < this.filteredQuotes.length - 1) {
            this.currentFilteredIndex++;
        }
        
        this.displayFilteredQuote();
    }
    
    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        // Insert message at the top of the main content
        const main = document.querySelector('main');
        main.insertBefore(messageDiv, main.firstChild);
        
        // Auto-remove message after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuoteGenerator();
});

// Add some utility functions for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Space bar to generate new quote
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            document.getElementById('generate-btn').click();
        }
        
        // Enter key in filter form
        if (e.code === 'Enter' && e.target.id === 'author-filter') {
            document.getElementById('filter-form').dispatchEvent(new Event('submit'));
        }
    });
    
    // Add loading animation for buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
});
