import { NextRequest } from 'next/server';
import { ResultSetHeader } from 'mysql2';
import pool from '@/lib/db';

type WriteAdminAuditLogInput = {
  adminUserId: number | null;
  action: string;
  targetType: string;
  targetId?: number | null;
  description?: string;
  beforeData?: unknown;
  afterData?: unknown;
  request?: NextRequest;
};

function getClientIp(request?: NextRequest) {
  if (!request) {
    return 'unknown';
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

export async function writeAdminAuditLog(input: WriteAdminAuditLogInput) {
  const ipAddress = getClientIp(input.request);
  const userAgent = input.request?.headers.get('user-agent') || 'unknown';

  await pool.query<ResultSetHeader>(
    `
    INSERT INTO admin_audit_logs
      (
        admin_user_id,
        action,
        target_type,
        target_id,
        description,
        before_data,
        after_data,
        ip_address,
        user_agent
      )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      input.adminUserId,
      input.action,
      input.targetType,
      input.targetId || null,
      input.description || null,
      input.beforeData ? JSON.stringify(input.beforeData) : null,
      input.afterData ? JSON.stringify(input.afterData) : null,
      ipAddress,
      userAgent
    ]
  );
}