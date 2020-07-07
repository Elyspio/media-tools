// To parse this data:
//
//   import { Convert, NvidiaSmi } from "./file";
//
//   const nvidiaSmi = Convert.toNvidiaSmi(json);

export interface NvidiaSmi {
    _declaration:   Declaration;
    _doctype:       string;
    nvidia_smi_log: NvidiaSmiLog;
}

export interface Declaration {
    _attributes: DeclarationAttributes;
}

export interface DeclarationAttributes {
    version: string;
}

export interface NvidiaSmiLog {
    timestamp:      AttachedGpus;
    driver_version: AttachedGpus;
    cuda_version:   AttachedGpus;
    attached_gpus:  AttachedGpus;
    gpu:            GPU;
}

export interface AttachedGpus {
    _text: string;
}

export interface GPU {
    _attributes:                 GPUAttributes;
    product_name:                AttachedGpus;
    product_brand:               AttachedGpus;
    display_mode:                AttachedGpus;
    display_active:              AttachedGpus;
    persistence_mode:            AttachedGpus;
    accounting_mode:             AttachedGpus;
    accounting_mode_buffer_size: AttachedGpus;
    driver_model:                DriverModel;
    serial:                      AttachedGpus;
    uuid:                        AttachedGpus;
    minor_number:                AttachedGpus;
    vbios_version:               AttachedGpus;
    multigpu_board:              AttachedGpus;
    board_id:                    AttachedGpus;
    gpu_part_number:             AttachedGpus;
    inforom_version:             InforomVersion;
    gpu_operation_mode:          GPUOperationMode;
    gpu_virtualization_mode:     GPUVirtualizationMode;
    ibmnpu:                      Ibmnpu;
    pci:                         PCI;
    fan_speed:                   AttachedGpus;
    performance_state:           AttachedGpus;
    clocks_throttle_reasons:     ClocksThrottleReasons;
    fb_memory_usage:             MemoryUsage;
    bar1_memory_usage:           MemoryUsage;
    compute_mode:                AttachedGpus;
    utilization:                 Utilization;
    encoder_stats:               Stats;
    fbc_stats:                   Stats;
    ecc_mode:                    ECCMode;
    ecc_errors:                  ECCErrors;
    retired_pages:               RetiredPages;
    temperature:                 Temperature;
    power_readings:              PowerReadings;
    clocks:                      Clocks;
    applications_clocks:         ApplicationsClocks;
    default_applications_clocks: ApplicationsClocks;
    max_clocks:                  Clocks;
    max_customer_boost_clocks:   MaxCustomerBoostClocks;
    clock_policy:                ClockPolicy;
    supported_clocks:            AttachedGpus;
    processes:                   Processes;
    accounted_processes:         AccountedProcesses;
}

export interface GPUAttributes {
    id: string;
}

export interface AccountedProcesses {
}

export interface ApplicationsClocks {
    graphics_clock: AttachedGpus;
    mem_clock:      AttachedGpus;
}

export interface MemoryUsage {
    total: AttachedGpus;
    used:  AttachedGpus;
    free:  AttachedGpus;
}

export interface ClockPolicy {
    auto_boost:         AttachedGpus;
    auto_boost_default: AttachedGpus;
}

export interface Clocks {
    graphics_clock: AttachedGpus;
    sm_clock:       AttachedGpus;
    mem_clock:      AttachedGpus;
    video_clock:    AttachedGpus;
}

export interface ClocksThrottleReasons {
    clocks_throttle_reason_gpu_idle:                    AttachedGpus;
    clocks_throttle_reason_applications_clocks_setting: AttachedGpus;
    clocks_throttle_reason_sw_power_cap:                AttachedGpus;
    clocks_throttle_reason_hw_slowdown:                 AttachedGpus;
    clocks_throttle_reason_hw_thermal_slowdown:         AttachedGpus;
    clocks_throttle_reason_hw_power_brake_slowdown:     AttachedGpus;
    clocks_throttle_reason_sync_boost:                  AttachedGpus;
    clocks_throttle_reason_sw_thermal_slowdown:         AttachedGpus;
    clocks_throttle_reason_display_clocks_setting:      AttachedGpus;
}

export interface DriverModel {
    current_dm: AttachedGpus;
    pending_dm: AttachedGpus;
}

export interface ECCErrors {
    volatile:  Aggregate;
    aggregate: Aggregate;
}

export interface Aggregate {
    sram_correctable:   AttachedGpus;
    sram_uncorrectable: AttachedGpus;
    dram_correctable:   AttachedGpus;
    dram_uncorrectable: AttachedGpus;
}

export interface ECCMode {
    current_ecc: AttachedGpus;
    pending_ecc: AttachedGpus;
}

export interface Stats {
    session_count:   AttachedGpus;
    average_fps:     AttachedGpus;
    average_latency: AttachedGpus;
}

export interface GPUOperationMode {
    current_gom: AttachedGpus;
    pending_gom: AttachedGpus;
}

export interface GPUVirtualizationMode {
    virtualization_mode: AttachedGpus;
    host_vgpu_mode:      AttachedGpus;
}

export interface Ibmnpu {
    relaxed_ordering_mode: AttachedGpus;
}

export interface InforomVersion {
    img_version: AttachedGpus;
    oem_object:  AttachedGpus;
    ecc_object:  AttachedGpus;
    pwr_object:  AttachedGpus;
}

export interface MaxCustomerBoostClocks {
    graphics_clock: AttachedGpus;
}

export interface PCI {
    pci_bus:                 AttachedGpus;
    pci_device:              AttachedGpus;
    pci_domain:              AttachedGpus;
    pci_device_id:           AttachedGpus;
    pci_bus_id:              AttachedGpus;
    pci_sub_system_id:       AttachedGpus;
    pci_gpu_link_info:       PCIGPULinkInfo;
    pci_bridge_chip:         PCIBridgeChip;
    replay_counter:          AttachedGpus;
    replay_rollover_counter: AttachedGpus;
    tx_util:                 AttachedGpus;
    rx_util:                 AttachedGpus;
}

export interface PCIBridgeChip {
    bridge_chip_type: AttachedGpus;
    bridge_chip_fw:   AttachedGpus;
}

export interface PCIGPULinkInfo {
    pcie_gen:    PcieGen;
    link_widths: LinkWidths;
}

export interface LinkWidths {
    max_link_width:     AttachedGpus;
    current_link_width: AttachedGpus;
}

export interface PcieGen {
    max_link_gen:     AttachedGpus;
    current_link_gen: AttachedGpus;
}

export interface PowerReadings {
    power_state:          AttachedGpus;
    power_management:     AttachedGpus;
    power_draw:           AttachedGpus;
    power_limit:          AttachedGpus;
    default_power_limit:  AttachedGpus;
    enforced_power_limit: AttachedGpus;
    min_power_limit:      AttachedGpus;
    max_power_limit:      AttachedGpus;
}

export interface Processes {
    process_info: ProcessInfo[];
}

export interface ProcessInfo {
    pid:          AttachedGpus;
    type:         AttachedGpus;
    process_name: AttachedGpus;
    used_memory:  AttachedGpus;
}

export interface RetiredPages {
    multiple_single_bit_retirement: LEBitRetirement;
    double_bit_retirement:          LEBitRetirement;
    pending_blacklist:              AttachedGpus;
    pending_retirement:             AttachedGpus;
}

export interface LEBitRetirement {
    retired_count:    AttachedGpus;
    retired_pagelist: AttachedGpus;
}

export interface Temperature {
    gpu_temp:                   AttachedGpus;
    gpu_temp_max_threshold:     AttachedGpus;
    gpu_temp_slow_threshold:    AttachedGpus;
    gpu_temp_max_gpu_threshold: AttachedGpus;
    memory_temp:                AttachedGpus;
    gpu_temp_max_mem_threshold: AttachedGpus;
}

export interface Utilization {
    gpu_util:     AttachedGpus;
    memory_util:  AttachedGpus;
    encoder_util: AttachedGpus;
    decoder_util: AttachedGpus;
}
