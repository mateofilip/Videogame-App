import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div>
      <Link to="/homepage">
        <button>▶ Press Start</button>
      </Link>
    </div>
  );
}
