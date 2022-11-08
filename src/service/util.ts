import { Response } from 'express';

export const badRequest = (res: Response, err: string) =>{
    res.status(400).json({
        err
    })
}

export const internalError = (res: Response, err: Error) =>{
    res.status(500).json({
        err: err.message
    })
}

export const notFound = (res: Response, err: string) =>{
    res.status(505).json({
        err
    })
}

export const okNumber = (num: any) => parseFloat(num) > 0