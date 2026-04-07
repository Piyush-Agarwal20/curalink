# 🧪 CuraLink Frontend Testing Guide

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at: http://localhost:5173

---

## Testing Without Backend

The frontend is fully functional UI-wise, but API calls will fail without the backend. Here's how to test:

### Test Navigation & UI

1. **Landing Page:** http://localhost:5173
   - All animations working
   - Scroll effects
   - Navigation links
   - CTA buttons

2. **Login Page:** http://localhost:5173/login
   - Form validation (try empty fields)
   - Email validation (try invalid email)
   - Password validation (min 6 chars)
   - Network tab shows API call attempt

3. **Patient Signup:** http://localhost:5173/signup/patient
   - All form fields
   - Real-time validation
   - Optional condition field
   - Submit shows loading state

4. **Researcher Signup:** http://localhost:5173/signup/researcher
   - All form fields
   - Institution field
   - Specialization field
   - Bio textarea

### Test Form Validation

**Try these scenarios:**

#### Login Form:
- ❌ Empty email → "Please enter a valid email address"
- ❌ Invalid email (test@) → Validation error
- ❌ Short password (< 6 chars) → "Password must be at least 6 characters"
- ✅ Valid form → Shows loading, makes API call

#### Signup Forms:
- ❌ Empty first name → "First name must be at least 2 characters"
- ❌ Empty last name → "Last name must be at least 2 characters"
- ❌ Invalid email → Validation error
- ❌ Short password → Validation error
- ✅ Valid form → Shows loading, makes API call

### Test Protected Routes

1. Try accessing without login:
   - http://localhost:5173/patient/dashboard
   - http://localhost:5173/researcher/dashboard
   - Should redirect to login

2. Check URL preservation:
   - Access `/patient/dashboard` → redirects to `/login?from=/patient/dashboard`
   - After login, should redirect back

---

## Testing With Backend

Once backend is running at `http://localhost:8000`:

### Full Authentication Flow

#### Patient Flow:
```
1. Go to /signup/patient
2. Fill form:
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@email.com
   - Password: password123
   - Condition: Type 2 Diabetes
3. Click "Create Account"
4. ✅ Should redirect to /patient/dashboard
5. ✅ See "Welcome, John!"
6. ✅ Logout button works
7. ✅ After logout, can't access dashboard
```

#### Researcher Flow:
```
1. Go to /signup/researcher
2. Fill form:
   - First Name: Dr. Jane
   - Last Name: Smith
   - Email: jane.smith@university.edu
   - Institution: Stanford University
   - Specialization: Oncology
   - Password: password123
3. Click "Create Account"
4. ✅ Should redirect to /researcher/dashboard
5. ✅ See "Welcome, Dr. Smith!"
6. ✅ Logout button works
```

#### Login Flow:
```
1. Sign up a user (either type)
2. Logout
3. Go to /login
4. Enter same credentials
5. ✅ Should login successfully
6. ✅ Redirect to correct dashboard based on user type
```

### Test Session Persistence

```
1. Login as patient
2. Refresh page (F5)
3. ✅ Should remain logged in
4. ✅ Dashboard still accessible
5. Close browser tab
6. Reopen http://localhost:5173/patient/dashboard
7. ✅ Should still be logged in (localStorage)
```

### Test Token Expiry

```
1. Login as any user
2. In DevTools Console:
   localStorage.removeItem('auth_token')
3. Try to access dashboard
4. ✅ Should redirect to login
```

### Test User Type Protection

```
1. Login as PATIENT
2. Try to access /researcher/dashboard
3. ✅ Should redirect to /patient/dashboard

1. Login as RESEARCHER
2. Try to access /patient/dashboard
3. ✅ Should redirect to /researcher/dashboard
```

---

## Browser DevTools Checks

### Network Tab

**On Login/Signup:**
- ✅ POST request to `/api/auth/login` or `/api/auth/signup/*`
- ✅ Request headers include `Content-Type: application/json`
- ✅ Request body has email & password
- ✅ Response (if backend running) includes user object & token

**On Protected Route Access:**
- ✅ GET request to `/api/auth/me`
- ✅ Request headers include `Authorization: Bearer <token>`

### Console Tab

Should be clean (no errors) when:
- Navigating between pages
- Submitting forms
- Loading protected routes

### Application Tab (localStorage)

After successful login, check:
```
Key: auth-storage
Value: {
  state: {
    user: {...},
    token: "...",
    isAuthenticated: true
  }
}
```

---

## Testing Error Scenarios

### Network Errors (Without Backend)

1. **Signup/Login without backend:**
   ```
   ✅ Should show toast: "Unable to connect to the server"
   ✅ Form should not freeze
   ✅ Can retry submission
   ```

2. **Invalid Credentials (with backend):**
   ```
   ✅ Should show toast: "Invalid email or password"
   ✅ Stay on login page
   ✅ Form fields remain filled
   ```

3. **Duplicate Email (with backend):**
   ```
   ✅ Should show error from backend
   ✅ Stay on signup page
   ```

---

## Manual Testing Checklist

### ✅ Phase 1 Features

- [ ] Landing page loads and displays correctly
- [ ] All navigation links work
- [ ] Login form validates inputs
- [ ] Login form shows loading state
- [ ] Patient signup form validates inputs
- [ ] Patient signup form shows loading state
- [ ] Researcher signup form validates inputs
- [ ] Researcher signup form shows loading state
- [ ] Protected routes redirect to login
- [ ] Dashboard displays after successful auth
- [ ] User name displays on dashboard
- [ ] Logout button works
- [ ] Session persists across page refreshes
- [ ] User type protection works
- [ ] Toast notifications appear
- [ ] Loading spinners show during API calls
- [ ] Form errors display properly

---

## API Testing (Postman/cURL)

### Test Backend Endpoints

```bash
# Patient Signup
curl -X POST http://localhost:8000/api/auth/signup/patient \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@test.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "condition": "Testing condition"
  }'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@test.com",
    "password": "password123"
  }'

# Get Current User (use token from login)
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Environment Configuration

### Check `.env.local`

```bash
VITE_API_URL=http://localhost:8000
```

If backend runs on different port, update accordingly.

### Verify Environment Variable

In browser console:
```javascript
console.log(import.meta.env.VITE_API_URL)
// Should output: "http://localhost:8000"
```

---

## Troubleshooting

### Issue: Forms not submitting

**Solution:**
- Check Network tab for errors
- Verify backend is running
- Check CORS settings on backend
- Verify API URL in `.env.local`

### Issue: Not redirecting after login

**Solution:**
- Check browser console for errors
- Verify token is being stored in localStorage
- Check Zustand store state in React DevTools

### Issue: Always redirected to login

**Solution:**
- Check if token exists in localStorage
- Verify token format in Authorization header
- Check backend `/api/auth/me` endpoint

### Issue: Validation not working

**Solution:**
- Check if Zod schemas are imported correctly
- Verify react-hook-form resolver setup
- Check console for validation errors

---

## Performance Testing

### Lighthouse Audit

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit
4. **Expected scores:**
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

### Network Throttling

Test with slow 3G:
- Forms should still be responsive
- Loading states should be visible
- Timeouts should be handled gracefully

---

## Accessibility Testing

### Keyboard Navigation

- [ ] Tab through all form fields
- [ ] Enter key submits forms
- [ ] Escape key closes modals
- [ ] Focus indicators visible

### Screen Reader

Test with NVDA/JAWS:
- [ ] Form labels announced correctly
- [ ] Error messages announced
- [ ] Button states announced
- [ ] Navigation structure clear

---

## Cross-Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

Test mobile browsers:
- [ ] Chrome Mobile
- [ ] Safari iOS

---

## Known Issues & Limitations

1. **Backend Required for Full Testing:** Most features need backend
2. **No Password Reset:** Feature not implemented yet
3. **No Email Verification:** Coming in later phases
4. **Dashboards are Placeholders:** Real features in Phase 3 & 4

---

## Next Steps

Once Phase 1 testing is complete:
1. Start backend development
2. Test full authentication flow
3. Move to Phase 2 (State Management)

---

**Happy Testing! 🚀**
