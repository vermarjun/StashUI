import CountUp from "@/registry/react-bits/CountUp"

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-12 p-12">
      <div className="flex flex-col items-center gap-2">
        <span className="text-6xl font-bold text-blue-600">
          <CountUp to={1000} from={0} duration={2} separator="," />
        </span>
        <span className="text-sm text-gray-500">Users</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-6xl font-bold text-green-600">
          <CountUp to={99.9} from={0} duration={2.5} />
        </span>
        <span className="text-sm text-gray-500">Uptime %</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-6xl font-bold text-purple-600">
          <CountUp to={5000000} from={0} duration={3} separator="," />
        </span>
        <span className="text-sm text-gray-500">Revenue</span>
      </div>
    </div>
  )
}
