import React from 'react';

function Footer() {
    return ( 
        <footer style={{backgroundColor:"rgb(250,250,250)"}}>
        <div className='container border-top mt-5' >
            <div className='row mt-5'>
                <div className='col social-links'>
                    <img src='media\images\Investix.svg' alt='logo' style={{width: "50%"}} className='mb-4'/>
                    <p>
                        &copy; 2010-2027, Not Investix Broking Ltd.
                        All rights reserved.
                    </p>

                    <a href="/" aria-label="Twitter">
                        <i className="fa-brands fa-x-twitter"></i>
                    </a>
                    <a href="/" aria-label="Facebook">
                        <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="/" aria-label="Linkedin">
                        <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="/" aria-label="Instagram">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="/" aria-label="Telegram">
                        <i className="fa-brands fa-telegram"></i>
                    </a>
                </div>
                
                

                <div className='col footer-links'>
                    <p >Company</p>
                    <a href='/about'>About</a><br/>
                    <a href='/products'>Products</a><br/>
                    <a href='/pricing'>pricing</a><br/>
                    <a href='/'>Referral programme</a><br/>
                    <a href='/'>Careers</a><br/>
                    <a href='/'>Investix.tech</a><br/>
                    <a href='/'>Press & media</a><br/>
                    <a href='/'>Investix cares (CSR)</a><br/>
                </div>

                <div className='col footer-links'>
                    <p>Support</p>
                    <a href='/support'>Contact</a><br/>
                    <a href='/support'>Support portal</a><br/>
                    <a href='/'>Z-connect blog</a><br/>
                    <a href='/'>List of charges</a><br/>
                    <a href='/'>Download & Resources</a><br/>
                </div>
                <div className='col footer-links'>
                    <p>Account</p>
                    <a href='/signup'>Open an Account</a><br/>
                    <a href='/'>Fund transfer</a><br/>
                    <a href='/'>60 days challenge</a><br/>
                </div>
            </div>

            <div className='mt-5 text-muted' style={{fontSize:"16px"}}>
            <p>
                Investix Broking Ltd.: Member of NSE & BSE – SEBI Registration no.: INZ000031633.
                DP ID: IN-DP-100-2015 Commodity Trading through Investix Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration no.: INZ000038238.
                Registered Address: #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru – 560078, India.
                For any complaints pertaining to securities broking, please write to complaints@investix.com
                , for DP related to dp@investix.com
                .
                Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI.
            </p>
                
            <p>
                Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID.
                Benefits: Effective Communication, Speedy redressal of the grievances.
            </p>

            <p>
                Investments in securities market are subject to market risks; read all the related documents carefully before investing.  
            </p>

            <p>
                "Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities market – once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary.
            </p>

            <p className='mb-3'>
                In case of any allotment of funds, funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to do so. If you find anyone claiming to be part of Investix and offering such services, please create a ticket here."
            </p>
            </div>
        </div>
        </footer>
     );
}

export default Footer;