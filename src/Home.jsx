import Typewriter from "./Typewriter";

export function Home() {
  return (
    <div id="home">
      <h1>
        <Typewriter text="  Welcome to my Menu Planner" delay={100} />
      </h1>
    </div>
  );
}
