import { Feature } from './types';
import { Services } from '../index';
import { featureMap } from '../../../config/projects';


export class FeatureService {
    public async getAvailableFeature(): Promise<Feature[]> {
        const templates = await Services.projects.github.getTemplates();
        const features = new Set<Feature>();
        for (const t of templates) {
            for (const f of featureMap[t.id.toString()]) {
                features.add(f);
            }
        }
        return [...features];
    }
}
