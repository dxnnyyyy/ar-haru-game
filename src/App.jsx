import Headline from "./components/Headline";
import Button from "./components/Button";
import Image from "./components/Image";

export default function App() {
  return (
    <>
      <Headline text="AR Haru Tic-Tac-Toe" />

      <Image src="/images/haru_illu.svg" alt="" />

      <Button to="/create-lobby">Create Lobby</Button>
      <Button to="/join-lobby">Join Lobby</Button>
      <Button to="https://www.strichpunkt-design.de/en/research">
        Visit my friends @ SP
      </Button>
    </>
  );
}
