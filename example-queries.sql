-- ============================================
-- EXAMPLE QUERIES
-- ============================================
-- Kumpulan query berguna untuk development dan testing

-- ============================================
-- 1. BASIC QUERIES
-- ============================================

-- Get all published projects
SELECT id, title, client, category, status, created_at
FROM projects
WHERE status = 'Published'
ORDER BY created_at DESC;

-- Get all published articles
SELECT id, title, category, author, date, status
FROM articles
WHERE status = 'Published'
ORDER BY date DESC;

-- Get all published testimonials
SELECT id, name, company, rating, status
FROM testimonials
WHERE status = 'Published'
ORDER BY date DESC;

-- Get user profile (gunakan auth.uid() di aplikasi)
SELECT id, name, email, phone, location, bio, avatar, website,
       github, linkedin, twitter, instagram
FROM user_profiles
WHERE id = 'YOUR-USER-ID-HERE';

-- ============================================
-- 2. STATISTICS QUERIES
-- ============================================

-- Count by status
SELECT status, COUNT(*) as total
FROM projects
GROUP BY status;

SELECT status, COUNT(*) as total
FROM articles
GROUP BY status;

SELECT status, COUNT(*) as total
FROM testimonials
GROUP BY status;

-- Projects by category
SELECT category, COUNT(*) as total
FROM projects
WHERE status = 'Published'
GROUP BY category
ORDER BY total DESC;

-- Articles by category
SELECT category, COUNT(*) as total
FROM articles
WHERE status = 'Published'
GROUP BY category
ORDER BY total DESC;

-- Average testimonial rating
SELECT 
  ROUND(AVG(rating)::numeric, 2) as average_rating,
  COUNT(*) as total_testimonials,
  COUNT(CASE WHEN rating = 5 THEN 1 END) as five_stars,
  COUNT(CASE WHEN rating = 4 THEN 1 END) as four_stars
FROM testimonials
WHERE status = 'Published';

-- ============================================
-- 3. SEARCH QUERIES
-- ============================================

-- Search projects by title or client
SELECT id, title, client, category
FROM projects
WHERE status = 'Published'
  AND (
    title ILIKE '%tech%' OR 
    client ILIKE '%tech%'
  )
ORDER BY created_at DESC;

-- Search articles by title or content
SELECT id, title, category, date
FROM articles
WHERE status = 'Published'
  AND (
    title ILIKE '%react%' OR 
    content ILIKE '%react%' OR
    'React' = ANY(tags)
  )
ORDER BY date DESC;

-- Find articles with specific tag
SELECT id, title, tags, date
FROM articles
WHERE status = 'Published'
  AND 'React' = ANY(tags)
ORDER BY date DESC;

-- ============================================
-- 4. DETAILED QUERIES
-- ============================================

-- Get project with all details
SELECT 
  id, title, client, year, category,
  overview, challenge, solution,
  array_length(results, 1) as results_count,
  array_length(technologies, 1) as tech_count,
  duration, role, status,
  created_at, updated_at
FROM projects
WHERE id = 'YOUR-PROJECT-ID-HERE';

-- Get latest articles with author info
SELECT 
  id, title, excerpt, 
  category, author, date,
  read_time, array_length(tags, 1) as tags_count
FROM articles
WHERE status = 'Published'
ORDER BY date DESC
LIMIT 10;

-- Get testimonials with rating summary
SELECT 
  id, name, position, company,
  LEFT(message, 100) || '...' as message_preview,
  rating, date
FROM testimonials
WHERE status = 'Published'
ORDER BY rating DESC, date DESC;

-- ============================================
-- 5. ANALYTICS QUERIES
-- ============================================

-- Projects created per month (last 6 months)
SELECT 
  TO_CHAR(created_at, 'YYYY-MM') as month,
  COUNT(*) as projects_count
FROM projects
WHERE created_at >= NOW() - INTERVAL '6 months'
GROUP BY TO_CHAR(created_at, 'YYYY-MM')
ORDER BY month DESC;

-- Articles published per month
SELECT 
  TO_CHAR(date, 'YYYY-MM') as month,
  COUNT(*) as articles_count
FROM articles
WHERE status = 'Published'
  AND date >= CURRENT_DATE - INTERVAL '6 months'
GROUP BY TO_CHAR(date, 'YYYY-MM')
ORDER BY month DESC;

-- Most used technologies (from projects)
SELECT 
  UNNEST(technologies) as technology,
  COUNT(*) as usage_count
FROM projects
WHERE status = 'Published'
GROUP BY technology
ORDER BY usage_count DESC
LIMIT 10;

-- Most popular article tags
SELECT 
  UNNEST(tags) as tag,
  COUNT(*) as usage_count
FROM articles
WHERE status = 'Published'
GROUP BY tag
ORDER BY usage_count DESC
LIMIT 10;

-- Testimonials by rating distribution
SELECT 
  rating,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM testimonials
WHERE status = 'Published'
GROUP BY rating
ORDER BY rating DESC;

-- ============================================
-- 6. RECENT ACTIVITY
-- ============================================

-- Latest updates across all tables
SELECT 'project' as type, title as name, updated_at
FROM projects
WHERE status = 'Published'
UNION ALL
SELECT 'article' as type, title as name, updated_at
FROM articles
WHERE status = 'Published'
UNION ALL
SELECT 'testimonial' as type, name, updated_at
FROM testimonials
WHERE status = 'Published'
ORDER BY updated_at DESC
LIMIT 20;

-- ============================================
-- 7. MAINTENANCE QUERIES
-- ============================================

-- Find draft items that haven't been updated in 30 days
SELECT 'project' as type, id, title as name, updated_at
FROM projects
WHERE status = 'Draft' 
  AND updated_at < NOW() - INTERVAL '30 days'
UNION ALL
SELECT 'article' as type, id, title as name, updated_at
FROM articles
WHERE status = 'Draft'
  AND updated_at < NOW() - INTERVAL '30 days'
ORDER BY updated_at;

-- Check for items with missing required fields
SELECT id, title, 'Missing hero_image' as issue
FROM projects
WHERE hero_image IS NULL OR hero_image = ''
UNION ALL
SELECT id, title, 'Missing overview' as issue
FROM projects
WHERE overview IS NULL OR overview = ''
UNION ALL
SELECT id, title, 'Missing image' as issue
FROM articles
WHERE image IS NULL OR image = '';

-- ============================================
-- 8. BULK UPDATE QUERIES (Use with caution!)
-- ============================================

-- Publish all draft projects (CAREFUL!)
-- UPDATE projects SET status = 'Published' WHERE status = 'Draft';

-- Change category for multiple projects
-- UPDATE projects 
-- SET category = 'Web Application' 
-- WHERE category = 'Web App';

-- Add a tag to all articles in a category
-- UPDATE articles 
-- SET tags = array_append(tags, 'NewTag')
-- WHERE category = 'Tutorial' AND status = 'Published';

-- ============================================
-- 9. DATA VALIDATION
-- ============================================

-- Check for duplicate titles
SELECT title, COUNT(*) as count
FROM projects
GROUP BY title
HAVING COUNT(*) > 1;

SELECT title, COUNT(*) as count
FROM articles
GROUP BY title
HAVING COUNT(*) > 1;

-- Check data quality
SELECT 
  COUNT(*) as total_projects,
  COUNT(CASE WHEN hero_image IS NULL OR hero_image = '' THEN 1 END) as missing_hero_image,
  COUNT(CASE WHEN array_length(technologies, 1) IS NULL THEN 1 END) as missing_technologies,
  COUNT(CASE WHEN array_length(results, 1) IS NULL THEN 1 END) as missing_results
FROM projects;

-- ============================================
-- 10. PERFORMANCE CHECKS
-- ============================================

-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check index usage
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan as index_scans
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;
