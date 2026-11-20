# Draftkin Studio Test and Lighting Test v1.0.5

Install the Windows x64 app for your role. Use separate accounts for Studio and Lighting. Both installers can run alongside the production apps.

- [Download Studio Test](https://github.com/sakohelv/Draftkin-Collaboration-Test/releases/download/paired-test-v1.0.5/Draftkin-Studio-Test-Setup-1.0.5-x64.exe)
- [Download Lighting Test](https://github.com/sakohelv/Draftkin-Collaboration-Test/releases/download/paired-test-v1.0.5/Draftkin-Lighting-Studio-Test-Setup-1.0.5-x64.exe)

## Connect the project

1. In Studio Test, choose **New test project** or open an existing paired test project.
2. Choose **Invite Lighting consultant** and enter the email the consultant uses in Lighting Test. Use **Invite Studio collaborator** for colleagues on your own team.
3. In Lighting Test, open **Consultant invitations** and accept. If the account was created after the invitation, Studio receives a prompt to confirm the account before the consultant can join.

## Try one exchange

1. In Studio, open **Document Exchange → Submission milestones → Assign milestone**. For example, choose Schematic Design, enter Building A, and ask Lighting for a layout and calculations.
2. To send the architectural files, choose **New submission**. Enter a package title. You can leave the milestone as **Unplanned** for this reference issue.
3. In **Edit package**, add files, a folder tree or a saved project presentation. Choose an issue number or leave it on **Automatic**. Save, then choose **Request internal approval**. A manager can **Approve version**, **Preview and issue**, then **Issue to Lighting**.
4. Lighting opens the notification or **Document Exchange → Received**. Open the package to preview a PDF or download a file in its original format. Choose **Download package folder** to save the files together with their folder structure. Choose **Create linked response** and select the assigned milestone.
5. Lighting can include its own folders such as `Documents`, `Drawings/DWG` and `Drawings/PDF`, and add a DIALux report alongside the original CAD. After the internal check, choose **Issue to Studio**.
6. Studio opens the received package and chooses **Review submission**. **Accepted** or **Changes requested** sends a notification back to Lighting. For corrections, Lighting opens **Submitted → Create revised issue**, replaces the changed files and issues again. Both teams can open the earlier issue.

**Received** contains incoming packages. **Submitted** contains your issued packages. **Drafts** and **Working files** are private to your project team. Use **+ Folder** for your team's own filing structure. An issued package keeps its folder layout for the recipient.

The two test apps support Studio–Lighting exchange and written review decisions. Client delivery and additional discipline apps are planned for a later phase. Each file can be up to 512 MiB. To resume an interrupted upload, select the same file again.
