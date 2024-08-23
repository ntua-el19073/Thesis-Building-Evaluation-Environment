import "./AboutUs.css";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-me">
        <img
          src="../images/login-background-image3.jpg"
          className="profile-pic"
        />
        <h2>Konstantinos Tsokas</h2>
        <p>
          Hi! I'm Konstantinos Tsokas, an enthusiastic student currently
          completing my diploma in Electrical and Computer Engineering at the
          National Technical University of Athens. My passion for programming
          drives me to constantly explore new technologies and deepen my
          understanding of complex systems. I thrive on challenges and am always
          eager to learn something new. Beyond my academic interests, I enjoy
          long-distance running and playing board games with friends, finding
          them to be a great way to unwind and strategize in a fun and engaging
          way. You can contact me at el19073@mail.ntua.gr
        </p>
      </div>

      <div className="about-fsu">
        <h2>Forecasting & Strategy Unit (FSU)</h2>
        <p>
          The Forecasting and Strategy Unit (FSU) is an integral part of the
          Decision and Administration Systems Laboratory within the School of
          Electrical and Computer Engineering at the National Technical
          University of Athens. The FSU plays a vital role in equipping future
          engineers with the expertise and skills needed in an era of rapid
          technological advancement.
        </p>
        <p>
          The Unit is composed of dedicated faculty members, postdoctoral
          researchers, and doctoral candidates who contribute to the teaching of
          undergraduate and postgraduate courses within the department. The Unit
          also collaborates with external researchers from the private sector
          and involves undergraduate students in its research activities.
        </p>
        <p>
          Through various national and European research projects, the FSU
          provides a platform for high-level research for PhD and postdoctoral
          researchers. Over the years, many theses and dissertations have been
          developed under the guidance of the Unit, contributing to the
          scientific community through presentations at conferences and
          publications in reputable journals.
        </p>
        <p>
          The FSU's research encompasses a broad range of areas, aiming to
          bridge the gap between the needs of the Greek industry, public, and
          private sectors with cutting-edge research in the European Union. Key
          research interests include forecasting support systems, decision
          support systems, machine learning, optimization, and data analytics.
        </p>
      </div>

      {/* <Footer></Footer> */}
    </div>
  );
};

export default AboutUs;
