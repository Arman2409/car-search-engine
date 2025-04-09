import type { PageTitleProps } from "../../../types/components/shared/props";

const PageTitle = ({
    title
}: PageTitleProps) => {
    return (
        <div className="w-[100%] h-[100px] bg-secondary text-custom-gray flex justify-center items-center">
            <h1 className="text-[50px] text-accent">
                {title}
            </h1>
        </div>
    )
}

export default PageTitle;