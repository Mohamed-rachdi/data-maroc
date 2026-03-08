import { SEO } from '../components/SEO';

export function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy - GeoDataMaroc"
        description="Privacy policy for GeoDataMaroc, the Moroccan data platform providing geospatial and economic datasets."
      />

      <div className="max-w-4xl mx-auto py-12 px-6 text-gray-700">
        
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Privacy Policy
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Last updated: January 2026
        </p>

        <p className="mb-6">
          Welcome to <strong>GeoDataMaroc</strong> (https://www.geodatamaroc.com).  
          GeoDataMaroc is a data platform dedicated to Moroccan datasets including 
          geospatial, economic, demographic and business data.  
          This Privacy Policy explains how we collect, use and protect information 
          when you use our platform.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
          1. Information We Collect
        </h2>

        <p className="mb-4">
          We may collect certain information when you interact with our platform.
        </p>

        <h3 className="font-semibold mb-2">
          Personal Information
        </h3>

        <p className="mb-4">
          When you request a dataset demo, contact us, or submit a form, we may collect:
        </p>

        <ul className="list-disc pl-6 mb-6">
          <li>Name</li>
          <li>Email address</li>
          <li>Company name</li>
          <li>Message or dataset request</li>
        </ul>

        <h3 className="font-semibold mb-2">
          Technical Information
        </h3>

        <p className="mb-6">
          When visiting our website, we may automatically collect technical data such as:
        </p>

        <ul className="list-disc pl-6 mb-6">
          <li>IP address</li>
          <li>Browser type</li>
          <li>Device information</li>
          <li>Pages visited</li>
          <li>Interaction data</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
          2. How We Use the Information
        </h2>

        <p className="mb-4">
          The information collected may be used to:
        </p>

        <ul className="list-disc pl-6 mb-6">
          <li>Respond to demo requests</li>
          <li>Provide access to datasets</li>
          <li>Improve our platform and services</li>
          <li>Analyze how users interact with the website</li>
          <li>Ensure security and prevent misuse</li>
        </ul>

        <p className="mb-6">
          GeoDataMaroc does not sell personal information to third parties.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
          3. Data Sources
        </h2>

        <p className="mb-6">
          GeoDataMaroc aggregates datasets from multiple sources including 
          publicly available information, open data portals, geospatial data 
          providers, statistical institutions and other data partners.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
          4. Cookies and Analytics
        </h2>

        <p className="mb-6">
          Our platform may use cookies or analytics tools to understand how 
          visitors use the website and to improve the user experience.  
          You can control cookies through your browser settings.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
          5. Data Security
        </h2>

        <p className="mb-6">
          We implement technical and organizational security measures to protect 
          the platform and user information from unauthorized access or misuse.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
          6. Third-Party Services
        </h2>

        <p className="mb-6">
          Our platform may rely on third-party services such as hosting providers, 
          database infrastructure (e.g. Supabase), and analytics tools.  
          These services may process data according to their own privacy policies.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
          7. User Rights
        </h2>

        <p className="mb-4">
          Users may contact us to:
        </p>

        <ul className="list-disc pl-6 mb-6">
          <li>Request access to their personal data</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of personal information</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
          8. Changes to this Privacy Policy
        </h2>

        <p className="mb-6">
          We may update this Privacy Policy from time to time.  
          Any changes will be published on this page.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
          9. Contact
        </h2>

        <p>
          If you have any questions regarding this Privacy Policy, you may contact:
        </p>

        <p className="mt-4">
          <strong>GeoDataMaroc</strong><br />
          Website: https://www.geodatamaroc.com<br />
          Email: contact@geodatamaroc.com
        </p>

      </div>
    </>
  );
}