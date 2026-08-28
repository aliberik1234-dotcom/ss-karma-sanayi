import { contextBridge, ipcRenderer } from 'electron';

const electronAPI = {
  checkStatus: () => ipcRenderer.invoke('system:checkStatus'),
  completeSetup: (payload: any) => ipcRenderer.invoke('setup:complete', payload),

  guestLogin: () => ipcRenderer.invoke('auth:guestLogin'),
  adminLogin: (payload: { username: string; password: string }) => ipcRenderer.invoke('auth:adminLogin', payload),
  logout: (payload: { token: string }) => ipcRenderer.invoke('auth:logout', payload),
  validateSession: (payload: { token: string }) => ipcRenderer.invoke('auth:validateSession', payload),

  searchGlobal: (payload: { token: string; query: string; role: 'admin' | 'guest' }) => ipcRenderer.invoke('members:searchGlobal', payload),
  getDashboardStats: (payload: { token: string }) => ipcRenderer.invoke('dashboard:getStats', payload),
  getOverdueInstallments: (payload: { token: string; filter?: 'all' | 'overdue' | 'today' | 'week' | 'month' | 'paid' | 'partial' | 'unpaid' }) => ipcRenderer.invoke('dashboard:getOverdue', payload),

  listMembers: (payload: { token: string; search?: string; sortBy?: string }) => ipcRenderer.invoke('members:list', payload),
  getNextSequence: (payload: { token: string }) => ipcRenderer.invoke('members:getNextSequence', payload),
  createMember: (payload: { token: string; fullName: string; phone: string; sequenceNumber?: number }) => ipcRenderer.invoke('members:create', payload),
  updateMember: (payload: { token: string; id: string; fullName?: string; phone?: string; sequenceNumber?: number }) => ipcRenderer.invoke('members:update', payload),
  deleteMember: (payload: { token: string; id: string }) => ipcRenderer.invoke('members:delete', payload),

  verifyPrivatePassword: (payload: { token: string; memberId: string; password: string }) => ipcRenderer.invoke('private:verifyPassword', payload),
  getFinancialDetails: (payload: { token: string; grantToken: string; memberId: string }) => ipcRenderer.invoke('private:getFinancial', payload),
  updateFinancialBasic: (payload: { token: string; grantToken: string; memberId: string; plotSize?: string; downPayment?: string }) => ipcRenderer.invoke('private:updateBasic', payload),
  createInstallmentPlan: (payload: { token: string; grantToken: string; memberId: string; totalInstallments: number; installmentAmount: string; startDate: string }) => ipcRenderer.invoke('private:createPlan', payload),
  recordPayment: (payload: { token: string; grantToken: string; memberId: string; installmentId: string; status: string; bankId?: string | null; paymentDate?: string | null; receiptNumber?: string | null; notes?: string | null }) => ipcRenderer.invoke('private:recordPayment', payload),
  generateReceipt: (payload: { token: string; grantToken: string; memberId: string; installmentId: string }) => ipcRenderer.invoke('private:generateReceipt', payload),
  listBanks: (payload: { token: string }) => ipcRenderer.invoke('private:listBanks', payload),

  printMemberReport: (payload: { token: string; grantToken: string; memberId: string }) => ipcRenderer.invoke('print:memberReport', payload),

  changeAdminPassword: (payload: { token: string; oldPass: string; newPass: string }) => ipcRenderer.invoke('settings:changeAdminPassword', payload),
  changeAdminUsername: (payload: { token: string; newUsername: string }) => ipcRenderer.invoke('settings:changeAdminUsername', payload),
  changePrivatePassword: (payload: { token: string; oldPass: string; newPass: string }) => ipcRenderer.invoke('settings:changePrivatePassword', payload),
  getAuditLogs: (payload: { token: string }) => ipcRenderer.invoke('settings:getAuditLogs', payload),
  verifyAuditChain: (payload: { token: string }) => ipcRenderer.invoke('settings:verifyAuditChain', payload),
   createBackup: (payload: { token: string }) => ipcRenderer.invoke('settings:createBackup', payload),
  restoreBackup: (payload: { token: string; encryptedBackup: string; checksum?: string }) => ipcRenderer.invoke('settings:restoreBackup', payload),
  generateNumber: (payload: { token: string; prefix: 'THS' | 'UYE' | 'BKP' }) => ipcRenderer.invoke('settings:generateNumber', payload),

  getPreferences: () => ipcRenderer.invoke('settings:getPreferences'),
  savePreferences: (payload: { theme?: string; sound?: boolean }) => ipcRenderer.invoke('settings:savePreferences', payload),

  getAutoBackupConfig: () => ipcRenderer.invoke('settings:getAutoBackupConfig'),
  saveAutoBackupConfig: (payload: { token: string; enabled: boolean; backupPath: string; intervalHours: number }) => ipcRenderer.invoke('settings:saveAutoBackupConfig', payload),
  selectBackupDirectory: () => ipcRenderer.invoke('settings:selectBackupDirectory'),
  validateBackupPath: () => ipcRenderer.invoke('settings:validateBackupPath'),

  exportExcel: (payload: { token: string; password?: string }) => ipcRenderer.invoke('data:exportExcel', payload),

  getBackupHealth: () => ipcRenderer.invoke('settings:getBackupHealth'),
  saveCloudSyncInterval: (payload: { token: string; intervalHours: number }) => ipcRenderer.invoke('settings:saveCloudSyncInterval', payload),

  checkForUpdate: () => ipcRenderer.invoke('app:checkUpdate'),
  quitAndInstall: () => ipcRenderer.invoke('app:quitAndInstall'),

  onUpdateAvailable: (cb: (info: any) => void) => ipcRenderer.on('update:available', (_, info) => cb(info)),
  onUpdateProgress: (cb: (progress: any) => void) => ipcRenderer.on('update:progress', (_, progress) => cb(progress)),
  onUpdateDownloaded: (cb: () => void) => ipcRenderer.on('update:downloaded', () => cb()),
  onUpdateError: (cb: (message: string) => void) => ipcRenderer.on('update:error', (_, message) => cb(message)),

  removeUpdateListeners: () => {
    ipcRenderer.removeAllListeners('update:available');
    ipcRenderer.removeAllListeners('update:progress');
    ipcRenderer.removeAllListeners('update:downloaded');
    ipcRenderer.removeAllListeners('update:error');
  },

  getCloudSyncConfig: () => ipcRenderer.invoke('cloud:getConfig'),
  setCloudSyncConfig: (payload: { token: string; enabled: boolean; email?: string; accessToken?: string; refreshToken?: string }) => ipcRenderer.invoke('cloud:setConfig', payload),
  googleDriveAuth: () => ipcRenderer.invoke('cloud:googleAuth'),
  onGoogleDriveAuthResult: (cb: (event: any, data: any) => void) => ipcRenderer.on('cloud:auth-result', cb),
  removeGoogleDriveAuthCallback: () => ipcRenderer.removeAllListeners('cloud:auth-result'),

  uploadBackupToCloud: (payload: { token: string; filePath: string }) => ipcRenderer.invoke('cloud:uploadBackup', payload),
  downloadBackupFromCloud: (payload: { token: string }) => ipcRenderer.invoke('cloud:downloadBackup', payload),
  cloudBackupAndUpload: (payload: { token: string }) => ipcRenderer.invoke('cloud:backupAndUpload', payload)
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
