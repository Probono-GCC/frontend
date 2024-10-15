import React from "react";
import AppBar from "../Components/AppBar";

const TermsOfService = () => {
  return (
    <div id="page_content">
      <AppBar />
      <div style={styles.container}>
        <h1>CLA school management system - Terms of Service</h1>
        <article style={styles.article}>
          <h2>Article 1 (Purpose)</h2>
          <p>
            These terms aim to define the rights, duties, and responsibilities
            of the parties using the administrative services offered through our
            platform, accessible at{" "}
            <a href="http://www.cla-school.site/">
              http://www.cla-school.site/
            </a>
            . These terms apply to both members and non-members who use our
            service.
          </p>

          <h2>Article 2 (Definitions)</h2>
          <p>
            <strong>“Company”</strong> refers to the teamGCC, managing the
            system to provide academic and administrative services to the
            school.
            <br />
            <strong>“Users”</strong> means anyone accessing the platform,
            including students, teachers, and administrators.
            <br />
            <strong>“Members”</strong> are those registered with personal
            information to access more comprehensive functions.
            <br />
            <strong>“Services”</strong> include attendance management, academic
            records, bulletin boards, and other features for managing school
            operations.
          </p>

          <h2>Article 3 (Supplementary Provisions)</h2>
          <p>
            Any matters not covered in these terms will follow relevant laws or
            internal service policies. In the event of a conflict, service
            policies take precedence.
          </p>

          <h2>Article 4 (Modification of Terms)</h2>
          <p>
            We reserve the right to modify these terms to improve services.
            Users will be notified of significant changes 7 days in advance. If
            changes adversely affect users, a 30-day notice period will apply.
          </p>

          <h2>Article 5 (Service Availability)</h2>
          <p>
            The service operates 24/7. However, maintenance or unexpected issues
            may cause temporary disruptions. In such cases, users will be
            notified promptly.
          </p>

          <h2>Article 6 (Membership Registration)</h2>
          <p>
            Users can register by providing the required information. The
            company reserves the right to deny membership if:
            <br />
            1. Information provided is false.
            <br />
            2. Membership has previously been revoked.
          </p>

          <h2>Article 7 (Membership Termination)</h2>
          <p>
            Members can request to terminate their accounts at any time. The
            company may suspend or revoke memberships if users engage in
            prohibited activities or disrupt the system.
          </p>

          <h2>Article 8 (Notification to Members)</h2>
          <p>
            The platform will notify members via registered contact details or
            through bulletin postings for general announcements.
          </p>

          <h2>Article 9 (Service Use and User Obligations)</h2>
          <p>
            Users must comply with the platform’s policies and are responsible
            for maintaining the confidentiality of their account details.
          </p>

          <h2>Article 10 (Privacy Protection)</h2>
          <p>
            The company will collect only the necessary personal information for
            service provision and ensure secure data handling. Personal data
            will not be shared with third parties without consent, except for
            legal obligations or essential service-related processes like
            academic record verification.
          </p>
        </article>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
  },
  article: {
    marginBottom: "20px",
  },
};

export default TermsOfService;
