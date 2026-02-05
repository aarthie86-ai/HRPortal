import { Link } from "react-router-dom";

export default function UnAuth() {
  return (
    <div className="text-center bg-[#eaebf3] h-[calc(100vh-6rem)]">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 mt-6">
        401 - Unauthorized Access.
      </h1>
      <p className="text-gray-600">
        This page does not authorised with shared access.<br/><br />
        <Link to="/" className="text-sm text-blue-600 hover:underline">
            Go back to Login Page
        </Link>
      </p>
    </div>
  );
}
