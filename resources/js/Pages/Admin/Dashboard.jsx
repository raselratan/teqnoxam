import { Breadcrumb } from 'antd';
import { route } from "ziggy-js"

export default function Dashboard() {
    return (
        <div>
            <div className="border-b-1 w-full h-12">
                <div className="w-full h-full px-4 flex justify-start items-center">
                    <Breadcrumb
                        items={[
                            {
                                title: <a href={route('admin.dashboard')}>Dashboard</a>,
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="container mx-auto p-4">
                <div className="w-full h-full flex justify-center items-center p-4">
                    Dashboard
                </div>
            </div>
        </div>
    )
}
