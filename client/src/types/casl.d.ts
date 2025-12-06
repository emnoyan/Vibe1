import { ComponentCustomProperties } from 'vue'
import { MongoAbility } from '@casl/ability'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $can(action: string, subject: string): boolean;
        $ability: MongoAbility;
    }
}
