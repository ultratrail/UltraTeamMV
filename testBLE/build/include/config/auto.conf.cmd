deps_config := \
	/home/leo/esp/esp-idf/components/app_trace/Kconfig \
	/home/leo/esp/esp-idf/components/aws_iot/Kconfig \
	/home/leo/esp/esp-idf/components/bt/Kconfig \
	/home/leo/esp/esp-idf/components/esp32/Kconfig \
	/home/leo/esp/esp-idf/components/ethernet/Kconfig \
	/home/leo/esp/esp-idf/components/fatfs/Kconfig \
	/home/leo/esp/esp-idf/components/freertos/Kconfig \
	/home/leo/esp/esp-idf/components/heap/Kconfig \
	/home/leo/esp/esp-idf/components/libsodium/Kconfig \
	/home/leo/esp/esp-idf/components/log/Kconfig \
	/home/leo/esp/esp-idf/components/lwip/Kconfig \
	/home/leo/esp/esp-idf/components/mbedtls/Kconfig \
	/home/leo/esp/esp-idf/components/openssl/Kconfig \
	/home/leo/esp/esp-idf/components/pthread/Kconfig \
	/home/leo/esp/esp-idf/components/spi_flash/Kconfig \
	/home/leo/esp/esp-idf/components/spiffs/Kconfig \
	/home/leo/esp/esp-idf/components/tcpip_adapter/Kconfig \
	/home/leo/esp/esp-idf/components/wear_levelling/Kconfig \
	/home/leo/esp/esp-idf/components/bootloader/Kconfig.projbuild \
	/home/leo/esp/esp-idf/components/esptool_py/Kconfig.projbuild \
	/home/leo/esp/esp-idf/components/partition_table/Kconfig.projbuild \
	/home/leo/esp/esp-idf/Kconfig

include/config/auto.conf: \
	$(deps_config)


$(deps_config): ;
