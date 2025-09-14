import { config } from 'dotenv';
config();

import '@/ai/flows/predict-passenger-demand.ts';
import '@/ai/flows/get-routes-for-destination.ts';
import '@/ai/flows/chat.ts';
