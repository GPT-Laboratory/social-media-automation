# social-media-automation
Automating the YouTube Content Pipeline with n8n and a Custom Voice

Automated AI Video Generation \& Publishing Workflow



This project is an end-to-end AI-driven automation pipeline that generates and publishes videos based on a user prompt.



Deployment (n8n Workflow)



To deploy this workflow, first clone the repo on your PC/Laptop.



Deployment Instructions



Open PowerShell or Command Prompt.



Run this command to clone the repository:



git clone https://github.com/html5technologies786/social-media-automation.git

cd social-media-automation



Download and run Docker via docker command.



Make sure Docker is installed and running before deploying the workflow.



Run with Docker Compose   Visit: http://localhost:5678

&nbsp;(default port; replace if different in your case).



Click Create Workflow → go to the top-right menu (three dots) → Import from file → select Final.json (included in the repo).



This will set up and run the n8n-based workflow environment. #docker-compose.yaml file is provided in the code, you just need to run these below  given commands





⚠️ Important Notes



Ensure your actual .env file is in the same folder as your Dockerfile and .yaml files; otherwise, credentials won’t load.



After importing the workflow, you may see error signs on some nodes. Just open the nodes and go back to the canvas — the errors will disappear.



How to Create .env File



.env stores secret credentials and API keys instead of hardcoding them.



Example:



MY\_OPENAI\_API\_KEY=YOUR\_OPENAI\_API\_KEY



Inside n8n nodes, refrence it like this



{{$env.MY\_OPENAI\_API\_KEY}}



Make sure the key name in .env and inside n8n are exactly the same.



Keys Required for This Workflow



OpenAI API Key → Script generation



Eleven Labs API Key → Voiceover generation



Runway ML API Key → Image \& Video generation



Custom Merging Node → For merging audio and video files (provided in repo under backend)



YouTube Data V3 API → For uploading content to YouTube (create via Google Cloud → enable YouTube Data V3 API).



Custom Node.js API (Merging Audio \& Video)



This is a lightweight Node.js API for merging audio and video files.

It accepts two binary files (audio + video) as input and returns the merged video file.



Features



Merge any audio and video file into a single video



Simple REST API endpoints for easy integration



Can be deployed locally or on any hosting service



Built with Node.js + Express.js + FFmpeg



Deployment



Since you already cloned the repo, go to the backend folder:



cd backend

npm install    # Installs all required dependencies

npm start      # Starts the API locally





It will deploy the API on localhost.



Copy the provided URL from the console/browser and paste it inside the node named “Merging” in n8n.



Other Deployment Options



If you want to host it externally, deploy the API via GitHub or any hosting service, then use that hosted URL inside the n8n Merging API node.








