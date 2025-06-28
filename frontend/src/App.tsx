import React, { useEffect, useState } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DemoModal from './DemoModal';

const App: React.FC = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const openDemoModal = () => setIsDemoModalOpen(true);
  const closeDemoModal = () => setIsDemoModalOpen(false);
  useEffect(() => {
    // Matrix background effect
    const matrixBg = document.getElementById('matrix-bg');
    if (matrixBg) {
      const chars = "01";
      const fontSize = 14;
      const columns = Math.floor(window.innerWidth / fontSize);
      
      for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-line';
        column.style.left = (i * fontSize) + 'px';
        column.style.animationDuration = (Math.random() * 10 + 5) + 's';
        column.style.animationDelay = (Math.random() * 5) + 's';
        
        let content = '';
        const lineLength = Math.floor(Math.random() * 20) + 10;
        for (let j = 0; j < lineLength; j++) {
          content += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        column.textContent = content;
        matrixBg.appendChild(column);
      }
    }
    
    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate');
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          (element as HTMLElement).style.opacity = '1';
          (element as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initialize
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <div className="App">
      {/* Matrix Background Effect */}
      <div className="matrix-bg" id="matrix-bg"></div>

      {/* Header */}
      <header>
        <div className="container header-container">
          <div className="logo">
            <div className="logo-icon"><i className="fas fa-shield-alt"></i></div>
            <div className="logo-text">CYBERSAPIENT</div>
          </div>
          <nav className="nav-menu">
            <a href="#">Home</a>
            <a href="#">Services</a>
            <a href="#">Solutions</a>
            <a href="#">About</a>
            <a href="#">Resources</a>
            <a href="#">Contact</a>
          </nav>
          <button className="cta-button">Get Started</button>
          <div className="mobile-menu">
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content animate">
            <h1>Advanced Cybersecurity for the Digital Age</h1>
            <p>Protecting your business from evolving cyber threats with cutting-edge AI-powered security solutions and expert threat intelligence.</p>
            <div className="hero-buttons">
              <button className="primary-button">Explore Solutions</button>
              <button onClick={openDemoModal} className="secondary-button">Schedule Demo</button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <div className="section-title animate">
            <h2>Our Services</h2>
            <p>Comprehensive cybersecurity solutions tailored to your needs</p>
          </div>
          <div className="services-grid">
            <div className="service-card animate delay-1">
              <div className="service-icon">
                <i className="fas fa-lock"></i>
              </div>
              <h3>Threat Protection</h3>
              <p>Advanced threat detection and prevention systems powered by machine learning to identify and neutralize cyber threats in real-time.</p>
            </div>
            <div className="service-card animate delay-2">
              <div className="service-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Managed Security</h3>
              <p>24/7 monitoring and management of your security infrastructure by our team of certified cybersecurity experts.</p>
            </div>
            <div className="service-card animate delay-3">
              <div className="service-icon">
                <i className="fas fa-user-secret"></i>
              </div>
              <h3>Incident Response</h3>
              <p>Rapid response and recovery services to minimize damage and restore operations following a security breach.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="solutions">
        <div className="container">
          <div className="solutions-content">
            <div className="solutions-text animate">
              <h2>Intelligent Security Solutions</h2>
              <p>Our AI-driven platform continuously learns and adapts to new threats, providing proactive protection before attacks happen.</p>
              <p>By analyzing billions of data points across the threat landscape, we identify patterns and predict emerging threats with unprecedented accuracy.</p>
              <button className="primary-button" style={{marginTop: '20px'}}>Learn More</button>
            </div>
            <div className="solutions-image animate delay-1">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" alt="Cyber Security Dashboard" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="section-title animate">
            <h2>By The Numbers</h2>
            <p>Our impact in cybersecurity</p>
          </div>
          <div className="stats-grid">
            <div className="stat-item animate delay-1">
              <h3>99.9%</h3>
              <p>Threat Detection Rate</p>
            </div>
            <div className="stat-item animate delay-2">
              <h3>500+</h3>
              <p>Enterprise Clients</p>
            </div>
            <div className="stat-item animate delay-1">
              <h3>24/7</h3>
              <p>Security Monitoring</p>
            </div>
            <div className="stat-item animate delay-2">
              <h3>15min</h3>
              <p>Average Response Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-title animate">
            <h2>Client Testimonials</h2>
            <p>What our clients say about us</p>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card animate delay-1">
              <p className="testimonial-text">"CyberSapient's threat intelligence platform identified vulnerabilities we didn't even know existed. Their proactive approach saved us from a potentially devastating breach."</p>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div className="author-info">
                  <h4>John Davis</h4>
                  <p>CTO, TechCorp Inc.</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card animate delay-2">
              <p className="testimonial-text">"The incident response team handled our security emergency with incredible speed and professionalism. We were back online within hours with minimal disruption."</p>
              <div className="testimonial-author">
                <div className="author-avatar">SL</div>
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <p>Security Director, FinSecure</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card animate delay-3">
              <p className="testimonial-text">"Their managed security services have reduced our security overhead by 40% while significantly improving our protection. A game-changer for our business."</p>
              <div className="testimonial-author">
                <div className="author-avatar">MR</div>
                <div className="author-info">
                  <h4>Michael Roberts</h4>
                  <p>CIO, Global Retail Group</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2 className="animate">Ready to Secure Your Business?</h2>
          <p className="animate delay-1">Join thousands of enterprises that trust CyberSapient for their cybersecurity needs.</p>
          <button onClick={openDemoModal} className="primary-button animate delay-2">Request a Demo</button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <div className="logo">
                <div className="logo-icon"><i className="fas fa-shield-alt"></i></div>
                <div className="logo-text">CYBERSAPIENT</div>
              </div>
              <p style={{margin: '20px 0', color: 'var(--light)'}}>Advanced cybersecurity solutions for the modern enterprise.</p>
              <div className="social-links">
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-github"></i></a>
              </div>
            </div>
            <div className="footer-column">
              <h3>Services</h3>
              <ul className="footer-links">
                <li><a href="#">Threat Intelligence</a></li>
                <li><a href="#">Managed Security</a></li>
                <li><a href="#">Incident Response</a></li>
                <li><a href="#">Compliance</a></li>
                <li><a href="#">Security Training</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Solutions</h3>
              <ul className="footer-links">
                <li><a href="#">AI-Powered Security</a></li>
                <li><a href="#">Cloud Security</a></li>
                <li><a href="#">Endpoint Protection</a></li>
                <li><a href="#">Network Security</a></li>
                <li><a href="#">Data Protection</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Contact</h3>
              <ul className="footer-links">
                <li><i className="fas fa-map-marker-alt"></i> 123 Security Blvd, Cyber City</li>
                <li><i className="fas fa-phone"></i> +1 (555) 123-4567</li>
                <li><i className="fas fa-envelope"></i> info@cybersapient.io</li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023 CyberSapient. All rights reserved. Designed with <i className="fas fa-heart" style={{color: 'var(--secondary)'}}></i> for a secure digital future.</p>
          </div>
        </div>
      </footer>
      
      <DemoModal isOpen={isDemoModalOpen} onClose={closeDemoModal} />
    </div>
  );
};

export default App;
