import { ArrowUpRightLine } from "../../icons";

export const title = "Quick Links";

export const Widget = () => {
  return (
    <div className="flex flex-col gap-1.5 px-2 py-1.5">
      <a href="#" className="flex gap-2"> Create Leave Application <span><ArrowUpRightLine /></span></a>
      <a href="#" className="flex gap-2"> Feedback Received/Given<span><ArrowUpRightLine /></span></a>
      <a href="#" className="flex gap-2"> Helpdesk<span><ArrowUpRightLine /></span></a>
      <a href="#" className="flex gap-2"> Handbook<span><ArrowUpRightLine /></span></a>
    </div>
  )
}
