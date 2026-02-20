# Specification

## Summary
**Goal:** Build FocusShield+SleepReset, a stress management and sleep optimization app that helps users manage work-related stress through intelligent scheduling, wellness breaks, and sleep routines.

**Planned changes:**
- Create onboarding flow collecting wake/sleep times, work hours, meeting load, caffeine habits, diet preference (veg/non-veg), and goals (less stress, better sleep, better focus)
- Implement calendar integration placeholder that calculates daily meeting load score based on total hours, back-to-back meetings, and late meetings (after 7 PM)
- Build Focus Mode with automatic 1-2 minute reset breaks between back-to-back meetings, offering breathing exercises, eye relaxation, neck stretches, and mindfulness content
- Create Smart Focus Blocks suggesting 30-90 minute protected focus time in free calendar slots
- Add stress check-in system with mood slider (2-3 times daily) and dashboard showing meeting load, stress level, and focus blocks used
- Implement Sleep Mode with wind-down reminders (screens off, meditation, journaling) and late-call recovery plan that adjusts morning alarms after meetings ending after 8 PM
- Build caffeine cutoff reminder system (default 6 hours before sleep) with adherence tracking
- Generate simple daily diet plans (breakfast/lunch/dinner/hydration) customized by veg/non-veg preference with medical disclaimer
- Create weekly insights report analyzing patterns (late meetings vs stress, stress vs breaks, sleep vs caffeine) with 3 actionable tips
- Design privacy-focused architecture with local storage, clear privacy policy, and optional cloud sync
- Include sample content scripts for breathing (3-4 techniques), eye relaxation, neck stretches, and mindfulness (2-3 variations)
- Design clean, minimal UI with warm, calming colors that works offline for routine features

**User-visible outcome:** Users can onboard with their preferences, connect their calendar to see meeting load, receive automatic wellness breaks between meetings, lock focus blocks, track stress levels, follow sleep routines with late-meeting adjustments, get caffeine cutoff reminders, view personalized diet suggestions, and review weekly insights with actionable recommendations—all in a calming, privacy-focused interface that works offline.
