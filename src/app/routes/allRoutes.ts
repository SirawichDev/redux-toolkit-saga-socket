import React, { Component } from "react";
import ExchangeMarket from "../../features/ExchangeMarket/page";

type RouteProps = {
    path: string
    component: React.ComponentType<any>
    needAuth: boolean
    state: any
}

export const AllRoutes: Array<RouteProps> = [
    { path: '/market/:exchange_name', state: {exchange: 'fff'}, component: ExchangeMarket, needAuth: false }
]