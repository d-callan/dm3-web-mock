declare module '@biowasm/aioli' {
  interface AioliOptions {
    tool?: string;
    version?: string;
    urlPrefix?: string;
    wasmURL?: string;
    printInterleaved?: boolean;
    callback?: (payload: any) => void;
  }

  interface MountFileOptions {
    name: string;
    data: string | ArrayBuffer;
  }

  interface ExecResult {
    stdout: string;
    stderr: string;
    exitCode: number;
  }

  export default class Aioli {
    constructor(options: AioliOptions, config?: any);
    init(): Promise<void>;
    exec(command: string): Promise<ExecResult>;
    mount(files: MountFileOptions[]): Promise<string[]>;
    download(path: string): Promise<string>;
  }
}
