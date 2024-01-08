import { Request, Response } from 'express';
const Subscriber = require('../models/subscriber');
import { ISubscriber } from '../types/subscriber.type';

export async function getAllSubscribers(req: Request, res: Response): Promise<void> {
  try {
    const subscribers: ISubscriber[] = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getOneSubscriber(req: Request, res: Response): Promise<void> {
  const subscriber: ISubscriber = res.subscriber as ISubscriber;
  res.send(res.subscriber);
}

export async function createSubscriber(req: Request, res: Response): Promise<void> {
  const subscriber: ISubscriber = Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber: ISubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function updatedSubscriber(req: Request, res: Response): Promise<void> {
  const subscriber: ISubscriber = res.subscriber as ISubscriber;
  subscriber.name = req.body.name || subscriber.name;
  subscriber.subscribedToChannel =
    req.body.subscribedToChannel || subscriber.subscribedToChannel;
  try {
    const updatedSubscriber: ISubscriber = await subscriber.save();
    res.status(200).json(updatedSubscriber);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteSubscriber(req: Request, res: Response): Promise<void> {
  const subscriber: ISubscriber = res.subscriber as ISubscriber;
  try {
    await subscriber.deleteOne();
    res.status(200).json({ message: 'deleted with success' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

