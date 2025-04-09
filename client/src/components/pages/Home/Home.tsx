import GreetingInputs from "./components/GreetingInputs";
import PageTitle from "../../shared/PageTitle/PageTitle";

const Home = () => {
    return (
        <>
            <PageTitle title="Main page" />
            <div className="w-[100%] height-[100%] flex flex-col items-center justify-center p-6">
                <h2 className="text-primary mb-6">
                    Welcome to React + Vite + TypeScript + Tailwind + SCSS blueprint
                </h2>
                <GreetingInputs />
            </div>
        </>
    )
}

export default Home;