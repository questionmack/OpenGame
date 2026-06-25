export default function PrivacyPolicy() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>Last updated: June 25, 2026</p>

      <p>
        OpenGame ("we", "our", "us") operates the OpenGame mobile and web application
        (the "Service"), Nigeria's pickup sports and tournament booking platform. This
        Privacy Policy explains what information we collect, how we use it, and your
        rights regarding that information.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
        1. Information We Collect
      </h2>
      <p><strong>Account information:</strong> full name, email address, phone number, and city, collected when you create an account.</p>
      <p><strong>Booking information:</strong> sessions and tournaments you book, payment amounts, and booking status.</p>
      <p><strong>Payment information:</strong> payments are processed by Paystack, a licensed Nigerian payment processor. We do not store your card details. We retain transaction references and amounts for booking confirmation and support purposes.</p>
      <p><strong>Session chat:</strong> messages you send in session-specific chat groups, visible only to other confirmed players in that session.</p>
      <p><strong>Location and venue data:</strong> the venues and cities you browse or book, used to show you relevant sessions near you.</p>
      <p><strong>Device information:</strong> basic device and app usage data (such as crash logs) used to maintain and improve the Service.</p>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
        2. How We Use Your Information
      </h2>
      <p>We use your information to:</p>
      <ul>
        <li>Create and manage your account</li>
        <li>Process bookings and payments for sessions and tournaments</li>
        <li>Show you available sessions, venues, and tournaments</li>
        <li>Enable session chat between confirmed players</li>
        <li>Send booking confirmations and important updates about your sessions</li>
        <li>Improve and secure the Service</li>
      </ul>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
        3. Sharing of Information
      </h2>
      <p>
        We do not sell your personal information. We share information only with:
      </p>
      <ul>
        <li><strong>Paystack</strong>, to process payments securely</li>
        <li><strong>Venue partners</strong>, limited to the information needed to confirm your booking (such as your name and session details)</li>
        <li>Other confirmed players in a session, limited to your display name and chat messages within that session</li>
        <li>Law enforcement or regulators, only where required by Nigerian law</li>
      </ul>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
        4. Data Storage and Security
      </h2>
      <p>
        Your data is stored securely using Supabase, with industry-standard encryption
        in transit and at rest. Access to your data is restricted using row-level
        security policies, meaning only you (and authorized administrators where
        necessary for support) can access your personal booking and account information.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
        5. Your Rights
      </h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal information we hold about you</li>
        <li>Correct inaccurate information</li>
        <li>Request deletion of your account and associated data</li>
        <li>Withdraw consent for non-essential communications at any time</li>
      </ul>
      <p>
        To exercise any of these rights, contact us at the email address below.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
        6. Children's Privacy
      </h2>
      <p>
        The Service is not directed at children under 18. We do not knowingly collect
        personal information from children under 18.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
        7. Changes to This Policy
      </h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify users of
        material changes by posting a notice within the app or on this page.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
        8. Contact Us
      </h2>
      <p>
        If you have questions about this Privacy Policy or your personal information,
        contact us at:{" "}
        <a href="mailto:momolistic2008@gmail.com">momolistic2008@gmail.com</a>
      </p>
    </main>
  );
}
