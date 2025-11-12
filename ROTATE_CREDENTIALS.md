# 🔄 Panduan Rotasi Kredensial Supabase

## ⚠️ Kapan Perlu Rotasi Kredensial?

Rotasi kredensial diperlukan jika:
- ✅ File .env ter-commit ke repository public
- ✅ Kredensial terekspos di logs/screenshots
- ✅ Suspicious activity terdeteksi
- ✅ Team member keluar dari project
- ✅ Routine security maintenance (setiap 3-6 bulan)

---

## 🔐 Langkah-Langkah Rotasi

### 1. Generate New API Keys

#### Di Supabase Dashboard:

1. **Login ke Supabase Dashboard**
   - https://app.supabase.com

2. **Pilih Project Anda**

3. **Settings > API**

4. **Generate New Keys**
   - Klik "Generate new anon key"
   - Klik "Generate new service_role key" (jika digunakan)
   - **SIMPAN** keys yang baru!

5. **Copy Keys Baru**
   ```
   New Anon Key: eyJhbGc...
   New Service Role Key: eyJhbGc... (jika ada)
   ```

---

### 2. Update Environment Variables

#### Development (.env.local):
```bash
# Backup old .env.local
cp .env.local .env.local.backup

# Edit .env.local dengan keys baru
nano .env.local
# atau
code .env.local
```

Update dengan:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_new_anon_key_here
```

#### Production (Hosting Platform):

**Netlify:**
```
1. Site settings
2. Build & deploy
3. Environment
4. Environment variables
5. Edit VITE_SUPABASE_ANON_KEY
6. Save
```

**Vercel:**
```
1. Project Settings
2. Environment Variables
3. Edit VITE_SUPABASE_ANON_KEY
4. Save
5. Redeploy
```

**Other Platforms:**
- Update environment variables sesuai platform
- Trigger redeploy

---

### 3. Revoke Old Keys

#### Di Supabase Dashboard:

1. **Settings > API**
2. **Revoke old keys**
   - Klik "Revoke" pada old anon key
   - Confirm revocation

⚠️ **PENTING**: Lakukan ini SETELAH deployment dengan keys baru berhasil!

---

### 4. Update All Instances

Pastikan update di semua tempat:
- [ ] .env.local (development)
- [ ] Hosting platform (production)
- [ ] CI/CD pipelines (jika ada)
- [ ] Team members' local .env.local
- [ ] Documentation (jika ada hardcoded examples)

---

### 5. Test Koneksi

#### Test Development:
```bash
npm run dev
# Test login
# Test contact form
# Check browser console untuk errors
```

#### Test Production:
```bash
# Setelah deploy
# Buka production URL
# Test semua fitur
# Check untuk errors
```

---

### 6. Revoke Sessions (Optional tapi Recommended)

Jika kredensial terekspos:

1. **Supabase Dashboard > Authentication > Users**
2. **Untuk setiap user:**
   - Klik user
   - Klik "Sign out user"
   - User harus login ulang

Atau via SQL:
```sql
-- Revoke all sessions
DELETE FROM auth.sessions;
```

---

### 7. Update Password (Recommended)

Jika kredensial terekspos, update juga password admin:

1. **Supabase Dashboard > Authentication > Users**
2. **Klik admin user**
3. **Reset password**
4. **Send reset email atau set new password**

---

## 📋 Checklist Rotasi

- [ ] Generate new API keys di Supabase
- [ ] Backup old .env.local
- [ ] Update .env.local dengan keys baru
- [ ] Update environment variables di hosting
- [ ] Redeploy production
- [ ] Test development
- [ ] Test production
- [ ] Revoke old keys di Supabase
- [ ] Revoke all sessions (jika perlu)
- [ ] Update admin password (jika perlu)
- [ ] Notify team members
- [ ] Update documentation

---

## 🚨 Emergency Rotation (Kredensial Terekspos)

Jika kredensial sudah public/terekspos:

### Immediate Actions (dalam 1 jam):

1. **Generate & Deploy New Keys ASAP**
   ```bash
   # Update .env.local
   # Deploy ke production IMMEDIATELY
   ```

2. **Revoke Old Keys**
   ```
   Supabase Dashboard > Settings > API > Revoke
   ```

3. **Revoke All Sessions**
   ```sql
   DELETE FROM auth.sessions;
   ```

4. **Change Admin Password**
   ```
   Supabase Dashboard > Authentication > Users > Reset Password
   ```

5. **Monitor Logs**
   ```
   Supabase Dashboard > Logs
   Check untuk suspicious activity
   ```

### Follow-up Actions (dalam 24 jam):

6. **Review Audit Logs**
   ```sql
   SELECT * FROM audit_log 
   WHERE created_at > NOW() - INTERVAL '24 hours'
   ORDER BY created_at DESC;
   ```

7. **Check for Unauthorized Changes**
   - Review all data changes
   - Check for new users
   - Verify data integrity

8. **Update Security Policies**
   - Review RLS policies
   - Tighten security if needed

9. **Document Incident**
   - What happened
   - When it happened
   - Actions taken
   - Lessons learned

---

## 🔍 Verify Rotation Success

### Check Development:
```bash
# Start dev server
npm run dev

# Open browser console
# Should see no auth errors
# Test login
# Test all features
```

### Check Production:
```bash
# Open production URL
# Check browser console
# Test login
# Test contact form
# Verify no errors
```

### Check Supabase:
```
Dashboard > Logs
- No auth errors
- No connection errors
- Normal traffic patterns
```

---

## 📊 Post-Rotation Monitoring

Monitor untuk 24-48 jam setelah rotasi:

### Metrics to Watch:
- Failed authentication attempts
- Error rates
- API usage patterns
- User complaints
- Session creation/deletion

### Red Flags:
- ⚠️ Spike in failed auth attempts
- ⚠️ Unusual API usage patterns
- ⚠️ Errors in production logs
- ⚠️ User reports of access issues

---

## 📝 Rotation Log Template

Simpan log setiap rotasi:

```
Date: 2024-XX-XX
Reason: [Routine / Exposure / Security Incident]
Old Key (last 4 chars): ...xxxx
New Key (last 4 chars): ...yyyy
Performed by: [Name]
Verified by: [Name]
Issues encountered: [None / List issues]
Resolution time: [X hours]
Notes: [Additional notes]
```

---

## 🔄 Routine Rotation Schedule

Recommended schedule:

| Frequency | Action |
|-----------|--------|
| Every 3 months | Rotate API keys |
| Every 6 months | Change admin passwords |
| Every 12 months | Full security audit |
| As needed | Emergency rotation |

---

## 📞 Need Help?

Jika ada masalah saat rotasi:

- **Email**: nopianhadi2@gmail.com
- **WhatsApp**: 0895-4061-8407
- **Supabase Support**: https://supabase.com/support

---

## 📚 Additional Resources

- [Supabase API Keys Documentation](https://supabase.com/docs/guides/api/api-keys)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/security)
- [OWASP Key Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Key_Management_Cheat_Sheet.html)

---

**Remember**: Rotasi kredensial adalah bagian penting dari security maintenance. Lakukan secara rutin dan dokumentasikan dengan baik! 🔐
