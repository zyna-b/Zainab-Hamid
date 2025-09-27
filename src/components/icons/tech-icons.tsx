// src/components/icons/tech-icons.tsx
import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

type TechIconProps = SVGProps<SVGSVGElement>;

// Generic placeholder for icons not fully implemented here with full SVGs
const GenericTechIcon = ({ className, char, bgColor = 'bg-muted/30', textColor = 'text-foreground/80' }: { className?: string; char: string, bgColor?: string, textColor?: string }) => (
  <div className={cn("flex items-center justify-center font-bold text-sm rounded-md w-full h-full", bgColor, textColor, className)}>
    {char}
  </div>
);

export const PythonIcon = ({ className, ...props }: TechIconProps) => (
  <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M24.21,11.017c-1.225-0.739-2.654-1.165-4.164-1.165h-2.61V5.005H28v9.027h-3.194 C24.806,14.032,24.529,13.632,24.21,11.017z M15.436,5.005v4.847h2.61c2.076,0,3.762,1.686,3.762,3.762s-1.686,3.762-3.762,3.762 h-2.61v5.719h-4.847V5.005H15.436z" fill="#306998"/><path d="M7.79,20.983c1.225,0.739,2.654,1.165,4.164,1.165h2.61v4.847H4v-9.027h3.194 C7.194,17.968,7.471,18.368,7.79,20.983z M16.564,26.995v-4.847h-2.61c-2.076,0-3.762-1.686-3.762-3.762s1.686-3.762,3.762-3.762 h2.61V8.897h4.847v18.098H16.564z" fill="#FFD43B"/></svg>
);

export const JavaScriptIcon = ({ className, ...props }: TechIconProps) => (
  <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}><path fill="#F7DF1E" d="M0 0h32v32H0z"/><path d="M21.001 13.855c-.21.305-.56.507-.96.507-.48 0-.85-.222-.96-.507-.12-.284-.021-.578.13-.799.16-.232.43-.381.78-.381.21 0 .35.03.49.081.13.05.21.111.3.161.35.284.43.658.22.937zm-4.042 1.301c-.53.687-1.361 1.088-2.412 1.088-.911 0-1.681-.273-2.232-.799-.56-.516-.88-1.27-.88-2.16v-.02c0-.911.32-1.671.88-2.181.55-.526 1.32-.81 2.232-.81 1.031 0 1.871.391 2.412 1.078.49.637.74 1.478.74 2.481s-.29 1.895-.74 2.523zm-2.402-5.328c-.76 0-1.361.232-1.791.687-.42.456-.64 1.037-.64 1.723v.02c0 .686.22 1.26.64 1.712.43.455 1.031.687 1.791.687s1.361-.232 1.791-.687c.43-.456.64-1.026.64-1.712v-.02c0-.686-.21-1.267-.64-1.723-.42-.455-1.031-.687-1.791-.687zm6.464 2.288c.48-.708.76-1.559.76-2.471v-.021c0-1.113-.38-2.025-1.121-2.701-.75-.676-1.762-1.017-3.043-1.017-.9 0-1.681.222-2.352.646-.66.425-1.131 1.037-1.391 1.823h-.06l-.27-.242-1.251-1.078-1.011.769.87 1.448c-.41.465-.62 1.006-.62 1.621v.021c0 .96.3 1.743.88 2.34.591.598 1.371.909 2.352.909.61 0 1.131-.141 1.551-.403.41-.263.73-.616.93-1.037h.07c.4.578 1.011.949 1.851 1.109l.44.06.461 1.311.78-.212-1.081-3.187c.3-.315.54-.718.7-1.189zM8.89 13.855c-.21.305-.56.507-.96.507-.48 0-.85-.222-.96-.507-.12-.284-.021-.578.13-.799.16-.232.43-.381.78-.381.21 0 .35.03.49.081.13.05.21.111.3.161.35.284.43.658.22.937z" fill="#323330"/></svg>
);

export const TypeScriptIcon = ({ className, ...props }: TechIconProps) => (
  <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}><path fill="#007ACC" d="M0 0h32v32H0z"/><path fill="#FFF" d="M7.28 20.139h2.999v-1.088c.63-.821 1.49-1.242 2.579-1.242.28 0 .52.03.72.091.19.06.34.141.45.232.11.091.19.192.24.293s.07.212.07.313c0 .111-.02.232-.06.343a.79.79 0 0 1-.18.283c-.09.091-.19.162-.32.202-.12.04-.28.06-.48.06-.581 0-1.061-.172-1.431-.506-.371-.344-.571-.787-.571-1.32v-4.693h8.066v1.5h-5.067v4.34c0 .93.26 1.681.78 2.251.511.57 1.212.86 2.112.86.73 0 1.361-.171 1.891-.505.521-.334.911-.798 1.162-1.393l2.221.908c-.451.908-1.071 1.63-1.862 2.16-.79.54-1.741.81-2.852.81-1.251 0-2.321-.364-3.212-1.09-.891-.728-1.341-1.757-1.341-3.089v-.363c0-.596.13-.997.37-1.211.24-.202.57-.303 1.01-.303.38 0 .7.09.95.283.25.181.42.433.52.756zm13.578-6.985c-.521-.788-1.222-1.181-2.112-1.181-.64 0-1.191.161-1.651.484-.46.324-.8.757-1.01 1.292h-.07l-.16-.141-1.751-1.484-1.411 1.13 1.231 2.07c-.24.314-.37.697-.37 1.14v.02c0 .767.26 1.383.76 1.847.511.464 1.131.707 1.871.707.53 0 .99-.131 1.381-.404.39-.272.68-.635.88-1.077h.06c.29.505.77.848 1.441 1.03l.31.04.32 1.444.56-.151-.76-3.525c.2-.232.37-.545.49-.918.12-.374.18-.798.18-1.262v-.021c0-.707-.21-1.343-.62-1.907zm-2.112 3.22c-.32.404-.75.606-1.291.606-.581 0-1.031-.202-1.361-.596-.32-.404-.49-.918-.49-1.544v-.02c0-.626.17-.141.49-1.554.33-.414.76-.616 1.3-.616.571 0 1.021.202 1.361.606.331.393.491.908.491 1.544v.02c0 .625-.16.151-.49.575z"/></svg>
);

export const JavaIcon = ({ className, ...props }: TechIconProps) => (
  <svg className={className} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}><path fill="#F89820" d="M15.67 7.064c-.424-.11-.86-.17-1.303-.17-.93 0-1.73.262-2.39.776-.662.516-.995 1.22-.995 2.116V10c0 .9.332 1.6.996 2.11s1.46.77 2.39.77c.444 0 .88-.06 1.304-.17l.388.99c-.495.212-1.05.32-1.652.32-1.254 0-2.288-.438-3.102-1.312-.813-.874-1.22-1.982-1.22-3.322V10c0-1.34.406-2.45 1.22-3.32C12.73 5.808 13.766 5.37 15.02 5.37c.602 0 1.158.107 1.652.32l-.39.996.388-.022zM8.75 14V5.75h1.488l.332 6.298L13.038 5.75H14.5V14h-1.33V7.42l-2.433 6.58h-.666l-2.03-6.58V14H8.75z"/><path fill="#5382A1" d="M4.834 12.968c.06.088.14.162.24.22.1.06.206.088.32.088.14 0 .258-.036.35-.11s.154-.17.18-.31c.022-.13.01-.26-.04-.38-.04-.12-.12-.21-.22-.27-.1-.06-.22-.09-.36-.09-.02 0-.04 0-.06.01l-.09.01-.12.03-.1.03c-.04.02-.07.03-.09.04l-.08.06c-.01.01-.02.02-.03.03l-.03.03c-.01.01-.02.02-.02.04l.01-.01c-.01.02-.02.03-.02.05l-.01.04c0 .02 0 .03.01.04zm-.45-1.712c.24-.23.54-.35.9-.35.21 0 .4.04.56.11.16.08.3.18.4.31.1.13.17.28.21.44.03.16.04.33.02.49l-.49 2.26h1.23l.5-2.29c.06-.29.02-.56-.11-.81-.13-.25-.33-.46-.59-.62-.26-.16-.58-.24-.94-.24-.46 0-.86.11-1.22.32s-.64.5-.84.86l-.11.19.08-.03c.02-.01.05-.02.07-.03zm3.036 4.134V14h.64v1.39h.02c.12-.21.28-.39.48-.53.2-.14.43-.21.69-.21.25 0 .48.06.68.17.2.11.36.26.48.45.12.19.19.39.22.61.03.22.01.43-.06.62l-.5 2.25h1.23l.5-2.28c.06-.29.03-.56-.1-.81-.13-.25-.33-.46-.59-.62-.26-.16-.57-.24-.94-.24-.38 0-.72.1-.99.29-.28.2-.49.45-.64.75l-.09.18-.58 2.52h-1.36z"/></svg>
);

export const GoIcon = ({ className, ...props }: TechIconProps) => (
  <svg className={className} viewBox="0 0 130 200" xmlns="http://www.w3.org/2000/svg" {...props}><path fill="#00ADD8" d="M67.15 133.22c-5.95 2.2-10.53 6.85-10.53 12.96 0 7.53 6.05 13.63 13.52 13.63 7.95 0 13.63-7.04 13.63-14.62 0-6.35-3.97-11.67-9.92-13.63l-6.7-1.74zm29.86-58.02c-2.32-1.02-3.54-3.3-3.54-5.77 0-3.85 3.08-6.97 6.87-6.97s6.88 3.12 6.88 6.97c0 2.47-1.22 4.75-3.53 5.77l-6.7 2.9zm-30.08 36.1c0 2.32-1.88 4.2-4.2 4.2s-4.2-1.88-4.2-4.2V91.38c0-2.32 1.88-4.2 4.2-4.2s4.2 1.88 4.2 4.2v19.92zm-.22 31.04l6.7 1.74c5.95-2.2 9.92-7.28 9.92-13.63 0-7.58-5.68-14.62-13.62-14.62-7.47 0-13.53 6.08-13.53 13.62 0 6.1 4.57 10.77 10.53 12.9l6.7-1.75v-1.74c-5.95 2.2-10.53 6.85-10.53 12.96 0 7.53 6.05 13.63 13.52 13.63 7.95 0 13.63-7.04 13.63-14.62 0-6.35-3.97-11.67-9.92-13.63l-6.7-1.74v-31.03zM103.7 68.5c0-3.85-3.08-6.97-6.88-6.97s-6.87 3.12-6.87 6.97c0 2.47 1.22 4.75 3.53 5.77l6.7 2.9c2.32 1.02 3.54 3.3 3.54 5.77 0 3.85-3.08 6.97-6.88 6.97s-6.87-3.12-6.87-6.97c0-2.47-1.22-4.75-3.53-5.77l-6.7-2.9v31.32c0 2.32 1.88 4.2 4.2 4.2s4.2-1.88 4.2-4.2V91.38c0-2.32-1.88-4.2-4.2-4.2s-4.2 1.88-4.2 4.2v19.92l6.7 1.74z"/></svg>
);

export const RustIcon = ({ className, ...props }: TechIconProps) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" {...props}><path fill="#DEA584" d="M62.5 187.5h125v-25H62.5z"/><path fill="#000" d="M125 36.5l36.3 75H88.7zm0 162.2L62.5 125h125zM31.2 106.2l75 36.3-37.5 56.3zm187.6 0l-75 36.3 37.5 56.3z"/></svg>
);

export const NextjsIcon = ({ className, ...props }: TechIconProps) => (
  <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" {...props}><path fillRule="evenodd" clipRule="evenodd" d="M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128ZM41.8333 55.8667V100H52.3V65.9L81.6667 100H90.1667V55.8667H79.6667V89.7334L52.3 55.8667H41.8333Z" fill="black"/><path d="M104 38.8667H87.4333L104 61.3V38.8667Z" fill="black"/></svg>
);

export const ReactIcon = ({ className, ...props }: TechIconProps) => (
  <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><title>React Logo</title><circle cx="0" cy="0" r="2.05" fill="#61dafb"/><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
);

export const NodejsIcon = ({ className, ...props }: TechIconProps) => (
  <svg className={className} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}><path fill="#8CC84B" d="M246.74 121.02L134.97 7.34c-4.97-4.98-13.05-4.98-18.02 0L72.03 52.2l23.9 23.82 21.06-21.03 71.75 71.62-30.1 30.04c-6.9 3.47-11.4 10.3-11.4 17.95v30.05l65.05 37.32c4.96 2.85 11.02 1.2 14.31-3.42l19.08-26.54c3.3-4.6 3.62-10.8.9-15.74l-19.82-34.93z"/><path fill="#68A063" d="M116.95 44.86L25.24 136.27a12.624 12.624 0 00-3.05 10.38l7.81 52.63a12.61 12.61 0 0012.2 10.32h.4l119.57-68.87V44.86h-45.22z"/></svg>
);

export const GitIcon = ({ className, ...props }: TechIconProps) => (
  <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}><path fill="#F05033" d="M30.818 14.512L17.486 1.182a1.023 1.023 0 00-1.448 0l-2.132 2.134a1.023 1.023 0 000 1.448l3.061 3.059a5.33 5.33 0 00-3.174 3.238l-3.862-3.86a1.023 1.023 0 00-1.448 0L6.35 9.333a1.023 1.023 0 000 1.448l3.868 3.868a5.335 5.335 0 00-.004 6.482l-3.862 3.862a1.023 1.023 0 000 1.448l2.134 2.132a1.023 1.023 0 001.448 0l3.862-3.862a5.33 5.33 0 006.362 0L23.62 28.82a1.023 1.023 0 001.448 0l2.132-2.132a1.023 1.023 0 000-1.448L24.14 22.18a5.33 5.33 0 003.236-3.174l3.06 3.061a1.023 1.023 0 001.448 0l2.134-2.132a1.023 1.023 0 000-1.448l-3.192-3.192zM20.69 20.69a3.206 3.206 0 11-4.536-4.536 3.206 3.206 0 014.536 4.536z"/></svg>
);

export const DockerIcon = ({ className, ...props }: TechIconProps) => (
  <svg className={className} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}><path fill="#0db7ed" d="M246.35 110.19c-3.91-15.87-29.07-25.6-29.07-25.6s-2.11-17.33-9.34-24.58c-7.05-7.06-17.41-9.51-24.36-9.51-8.19 0-16.93 2.92-23.42 8.73-6.78 6.06-10.18 14.42-10.18 14.42s-15.7-5.08-25.54-2.17c-9.84 2.91-17.19 11.27-17.19 11.27s-11.7-1.07-17.69 4.73c-6 5.8-6.78 13.91-6.78 13.91s-19.09-1.25-29.24 8.95c-10.16 10.2-11.42 26.03-11.42 26.03s-12.15 10.38-9.16 23.62c.17.73.34 1.47.51 2.21 0 0-.17.17-.17.34 0 .17-.17.17-.17.34l-.17.17c-1.53 6.42-2.38 13.01-2.38 19.73 0 28.24 22.95 51.19 51.19 51.19h135.35c28.24 0 51.19-22.95 51.19-51.19 0-14.63-6.17-27.93-16.28-37.55l.16-.17zM59.73 103.77h19.73v19.73H59.73zm26.15 0h19.73v19.73H85.88zm0-26.15h19.73v19.73H85.88zm26.15 0h19.73v19.73h-19.73zm-26.15 26.15h19.73v19.73H85.88zm26.15 0h19.73v19.73h-19.73zm26.15-26.15h19.73v19.73h-19.73zm0 26.15h19.73v19.73h-19.73zm26.15 0h19.73v19.73h-19.73z"/></svg>
);

export const VercelIcon = ({ className, ...props }: TechIconProps) => (
  <svg className={className} fill="currentColor" viewBox="0 0 256 222" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M128 0L256 221.705H0L128 0Z" /></svg>
);

// Placeholder icons for other technologies - replace with actual SVGs from Devicon or similar
export const AngularIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Ng" bgColor="bg-[#DD0031]" textColor="text-white"/>;
export const VuejsIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Vue" bgColor="bg-[#4FC08D]" textColor="text-white"/>;
export const TailwindCssIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Tw" bgColor="bg-[#06B6D4]" textColor="text-white"/>;
export const BootstrapIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Bs" bgColor="bg-[#7952B3]" textColor="text-white"/>;
export const TensorFlowIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Tf" bgColor="bg-[#FF6F00]" textColor="text-white"/>;
export const PyTorchIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="PyT" bgColor="bg-[#EE4C2C]" textColor="text-white"/>;
export const ScikitLearnIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="SkL" bgColor="bg-[#F7931E]" textColor="text-black"/>;
export const OpenCvIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="CV" bgColor="bg-[#5C3EE8]" textColor="text-white"/>;
export const HuggingFaceIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="🤗" bgColor="bg-yellow-400" textColor="text-black"/>;
export const LangChainIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="LC" bgColor="bg-[#ABE87A]" textColor="text-black"/>;
export const SqlIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="SQL" bgColor="bg-[#00758F]" textColor="text-white"/>;
export const PostgreSqlIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="PgS" bgColor="bg-[#336791]" textColor="text-white"/>;
export const MySqlIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="MyS" bgColor="bg-[#4479A1]" textColor="text-white"/>;
export const SqliteIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Lite" bgColor="bg-[#003B57]" textColor="text-white"/>;
export const MongoDbIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="MgDB" bgColor="bg-[#47A248]" textColor="text-white"/>; 
export const FirebaseIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Fb" bgColor="bg-[#FFCA28]" textColor="text-black"/>; 
export const SupabaseIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Sup" bgColor="bg-[#3ECF8E]" textColor="text-white"/>;
export const GitHubActionsIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="GhA" bgColor="bg-[#2088FF]" textColor="text-white"/>;
export const KubernetesIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="K8s" bgColor="bg-[#326CE5]" textColor="text-white"/>;
export const PostmanIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Pm" bgColor="bg-[#FF6C37]" textColor="text-white"/>;
export const SwaggerIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Swg" bgColor="bg-[#85EA2D]" textColor="text-black"/>;
export const AwsIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="AWS" bgColor="bg-[#232F3E]" textColor="text-white"/>;
export const GoogleCloudIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="GCP" bgColor="bg-[#4285F4]" textColor="text-white"/>;
export const AzureIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Az" bgColor="bg-[#0078D4]" textColor="text-white"/>;
export const HerokuIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Hrk" bgColor="bg-[#430098]" textColor="text-white"/>;
export const NetlifyIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Ntf" bgColor="bg-[#00C7B7]" textColor="text-white"/>;
export const RailwayIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Rlw" bgColor="bg-[#0B0D0E]" textColor="text-white"/>;
export const RenderIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Rnd" bgColor="bg-[#46E3B7]" textColor="text-black"/>;
export const KotlinIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Kt" bgColor="bg-[#7F52FF]" textColor="text-white"/>;
export const SwiftIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Swf" bgColor="bg-[#FA7343]" textColor="text-white"/>;
export const FlutterIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="Flu" bgColor="bg-[#02569B]" textColor="text-white"/>;
export const ReactNativeIcon = ({ className }: TechIconProps) => <GenericTechIcon className={className} char="RN" bgColor="bg-[#61DAFB]" textColor="text-black"/>;
