# Draftkin Lighting + Studio — collaboration test

A separate browser pilot for two people on different computers. Uses isolated test records in the existing London Supabase server. This is not an update to Draftkin Lighting 3.0.4 or Draftkin Studio 1.1.23.

## Try it

1. Sign in with your existing Draftkin account, or create an account.
2. Create a **test project**. You become its Lighting lead.
3. Open **Project access → Invite a colleague**. Select **Studio reviewer** and their email. Copy the private invitation link and share it with that colleague. No email is sent.
4. They open the link on their computer and sign in with that exact email. They see the Studio review view.
5. In Lighting, create a presentation. Add slides, text, shapes and images. Saved changes are shared through the cloud.
6. Choose **Ready for internal check → Mark internally checked → Send to Studio**. With two testers, the Lighting lead can perform the check; an additional Lighting reviewer can be invited for a separate check.
7. The Studio reviewer opens the review, places comments on slides and returns **Request changes** or **Approve presentation**.
8. Lighting chooses **Start next revision**, makes changes, checks and resubmits. Previous slides, comments and decisions remain attached to their original review.

Project chat has a Lighting-only conversation and a conversation shared with Studio. Online presence and notification indicators refresh while the page is open.

## Scope

- Real signed-in users and cloud records, not a role-switching simulation.
- This test contains a focused presentation editor and review workflow. The installed Lighting technical tools and installed Studio app remain unchanged.
- Both sides use this dedicated test website. Submissions do not appear in production Studio yet.
- Submitted copies are immutable slide snapshots rendered by the same browser renderer. Production PDF/PPTX authoring, CRS integration and full Studio permission templates are outside this first pilot.
- One active editor per presentation, with a 90-second expiring lock, revision checks and recovery for unsaved work in the same browser. Comments and chat remain available to other members.
- Polling every four seconds while visible; this is not character-by-character collaborative text editing.
- Images: PNG/JPEG/WebP up to 5 MB. Maximum 30 slides. Test invitations expire after seven days and are bound to the invited account email.

## Isolation and deployment

- GitHub Pages serves only `docs/` (static test UI).
- Supabase schema: `draftkin_collab_test`; private bucket: `draftkin-collab-test`.
- API: `public.draftkin_collaboration_test`, a security-invoker wrapper around a permission-checked private gateway.
- No direct table grants to browser roles. RLS enabled on all test tables. Authenticated membership is required for every project operation. Studio cannot read internal drafts or images until submitted.
- The client contains a public publishable API key, never a service key.
- Existing production schemas, storage buckets, authentication settings, release repositories and update channels are untouched.
- The pilot shares the existing server's authentication service. New registrations are real account identities on that server, but project access is isolated. Test project visibility never grants production project access.

## Run locally

Use Node 22 or newer. `npm start` serves the UI on `http://127.0.0.1:4417`. It still connects to the test cloud backend. `npm test` runs rendering checks.

`scripts/verify-live.mjs` performs live permission and workflow checks with three temporary QA accounts. It saves credentials only under ignored `.test-state/`. It must not be run against a different backend without reviewing the configuration. `scripts/qa-serve.mjs` is a loopback-only browser test helper and is never hosted by Pages.

All rights reserved. No production app source is included in this repository.
