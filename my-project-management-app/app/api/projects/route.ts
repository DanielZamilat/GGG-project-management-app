import { NextResponse } from 'next/server';
import { createNewProject, getProject, updateExistingProject, deleteExistingProject, getAllProjectsController } from '../../../lib/controllers/projectController';

export async function POST(request: Request) {
    const body = await request.json();
    return createNewProject(body.projectName, body.description, body.createdBy);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) {
        return getProject(parseInt(id));
    } else {
        return getAllProjectsController();
    }
}

export async function PUT(request: Request) {
    const body = await request.json();
    return updateExistingProject(body.id, body.projectName, body.description);
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    return deleteExistingProject(parseInt(id));
}