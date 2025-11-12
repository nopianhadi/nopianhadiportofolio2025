// Central export for all API functions
export { projectsApi } from './projects';
export { articlesApi } from './articles';
export { testimonialsApi } from './testimonials';
export { userProfilesApi } from './user-profiles';

// Re-export types for convenience
export type { Project, Article, Testimonial, UserProfile } from '../supabase';
