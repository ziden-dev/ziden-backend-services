import { Octokit } from "octokit";
import env from '../../lib/env/index.js';
import { BadRequestError } from "../errors/http/BadRequestError.js";

export async function createPullRequest(schema: any) {
    try {
        const time = (Number(Date.now())).toString();
        const schemaName = schema["@name"] ?? time;
        const schemaHash = schema["@hash"] ?? time;
        const branchName = `${schemaHash}-${time}`;

        let fileName = schema["@id"] ?? branchName;
        fileName = fileName.toString() + ".json";
        
        const schemaContent = btoa(JSON.stringify(schema, null, "\t"));

        const octokit = new Octokit({
            auth: env.git.token
        });
    
        await octokit.request(`POST /repos/${env.git.owner}/${env.git.schemaModelsRepo}/git/refs`, {
            owner: env.git.owner,
            repo: env.git.schemaModelsRepo,
            ref: `refs/heads/${branchName}`,
            sha: env.git.sha,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        await octokit.request(`PUT /repos/${env.git.owner}/${env.git.schemaModelsRepo}/contents/${env.git.jsonSchemaPath}/${fileName}`, {
            owner: env.git.owner,
            repo: env.git.schemaModelsRepo,
            path: `/${env.git.jsonSchemaPath}/${fileName}`,
            message: `request create schema ${fileName}`,
            committer: {
                name: schemaName,
                email: schemaName,
            },
            branch: branchName,
            content: schemaContent,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        await octokit.request(`POST /repos/${env.git.owner}/${env.git.schemaModelsRepo}/pulls`, {
            owner: env.git.owner,
            repo: env.git.schemaModelsRepo,
            title: `${schemaName} request create schema ${fileName}`,
            body: `${schemaName} request create schema ${fileName}`,
            head: branchName,
            base: 'main',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

    } catch (err: any) {
        console.log(err);
        throw(new BadRequestError("Cannot create pull request to github"));
    }
    
    
}