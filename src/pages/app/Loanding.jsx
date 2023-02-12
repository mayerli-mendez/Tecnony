import { Alert, Space, Spin } from 'antd';
import React from 'react';


export const Loanding = () => {
    return (
        <div className='loanding'>
            <center>
                <Space
                    direction="vertical"
                    style={{
                        width: '100%',
                    }}
                >
                    <Space>
                        <Spin tip="Cargando" size="center">
                        </Spin>
                    </Space>
                </Space>
            </center>

        </div>

    )
}
