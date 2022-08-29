import { format } from "date-fns";


export function SellCard({ users }) {
  console.log(users)
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Data
            </th>
            <th scope="col" className="py-3 px-6">
              Client Email
            </th>
            <th scope="col" className="py-3 px-6">
              Valor
            </th>
          </tr>
        </thead>
        <tbody>

          {
            users?.map((user) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {format(new Date(user.start_time), "MMMM do, yyyy H:mma")}
                </th>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.client_name}
                </th>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {`RS${user.price}`}
                </th>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}