import React from 'react';

function Team() {
  return (
    <div className="container">

      
      <div className="row mt-5 pt-5 border-top">
        <h1 className="text-center mb-5">People</h1>
      </div>

      
      <div className="row align-items-start py-4">

        
        <div className="col-6 text-center text-muted px-5">
          <img
            src="media/images/nithinKamath.jpg"
            alt="Nithin Kamath"
            className="rounded-circle"
            style={{
              width: "220px",
              height: "220px",
              objectFit: "cover"
            }}
          />
          <h4 className="mt-4 mb-1">Nithin Kamath</h4>
          <h6 className="fw-normal">Founder & CEO</h6>
        </div>

        
        <div className="col-6 text-muted px-5 lh-base" style={{ fontSize: "1.2em" }}>
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles
            he faced during his decade-long stint as a trader. Today, Zerodha has
            changed the landscape of the Indian broking industry.
          </p>

          <p>
            He is a member of the SEBI Secondary Market Advisory Committee (SMAC)
            and the Market Data Advisory Committee (MDAC).
          </p>

          <p>Playing basketball is his zen.</p>

          <p>
            connect on{" "}
            <a href="/" className="text-decoration-none">HomePage</a> /{" "}
            <a href="/" className="text-decoration-none">TradingQnQ</a> /{" "}
            <a href="/" className="text-decoration-none">Twitter</a>
          </p>
        </div>

      </div>

      
      <div className="row align-items-start py-5">

        
        <div className="col-6 text-center px-5">
          <img
            src="media/images/nikhilKamath.png"
            alt="Nikhil Kamath"
            className="rounded-circle"
            style={{
              width: "220px",
              height: "220px",
              objectFit: "cover"
            }}
          />
          <h4 className="mt-4 mb-1">Nikhil Kamath</h4>
          <h6 className="fw-normal text-muted">Co-founder, Zerodha</h6>
        </div>

        
        <div className="col-6 text-muted px-5 lh-base" style={{ fontSize: "1.2em" }}>
          <p>
            Nikhil Kamath is the co-founder of Zerodha and one of India’s youngest
            billionaires. He played a key role in building Zerodha’s trading
            platform and scaling it into India’s largest stock brokerage.
          </p>

          <p>
            He is also the founder of True Beacon, an asset management firm focused
            on alternative investments for high-net-worth individuals.
          </p>

          <p>
            Beyond finance, Nikhil is known for his interest in philosophy,
            technology, and public discourse.
          </p>

          <p>
            connect on{" "}
            <a href="/" className="text-decoration-none">HomePage</a> /{" "}
            <a href="/" className="text-decoration-none">Twitter</a>
          </p>
        </div>

      </div>

    </div>
  );
}

export default Team;
