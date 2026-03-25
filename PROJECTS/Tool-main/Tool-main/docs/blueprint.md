# **App Name**: InSight Hidden

## Core Features:

- Image Upload & Preview: Users can easily upload PNG/BMP images via drag-and-drop or a file input selector, with a clear preview of the selected image displayed in the UI.
- Message & File Input: Provide a dedicated text area for typing secret messages, and an option to upload small text files to be hidden within the selected image.
- LSB Encoding Request: Send the uploaded image, secret message or file, and optional password to a secure backend API to perform LSB steganography and embed the hidden data.
- Steganographic Image Download: Upon successful encoding, allow users to download the newly created steganographic image that contains the hidden information.
- LSB Decoding Request: Facilitate sending an uploaded steganographic image along with an optional password to a backend API for extraction of hidden messages or files.
- Extracted Data Display & Download: Clearly display any extracted text message within a UI element, and provide a download option for extracted files.
- Secret Message Contextualizer Tool: An AI tool that suggests or rephrases secret messages to create plausible, innocuous-sounding public contexts, helping the message blend seamlessly if it were ever unexpectedly exposed.

## Style Guidelines:

- Primary interactive color: A vibrant yet deep blue (#8FA3FF), suggesting digital precision and clarity, providing good contrast on a dark background.
- Background color: A very dark bluish-grey (#16171E), chosen to provide a professional, sleek, and high-tech canvas that emphasizes content and interactions.
- Accent color: A bright, electric cyan (#29CEE2), analogous to the primary, to highlight key calls-to-action, status indicators, and important elements, creating visual dynamism.
- The interface will predominantly use 'Inter' (sans-serif) for both headlines and body text. Its modern, neutral, and highly readable design ensures a clean and objective user experience, fitting for a precision tool.
- Utilize minimalist, crisp line icons that visually communicate functionality (e.g., upload cloud, hide eye, download arrow) without adding visual clutter.
- Implement a clean, two-column responsive layout: one for input/controls (image upload, message text, action buttons) and another for output/previews (image preview, extracted message display).
- Incorporate subtle loading spinners or progress bars for file processing, along with gentle transitions for state changes (e.g., image upload success, message extraction completion) to provide visual feedback.