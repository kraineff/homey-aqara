// @ts-check
const { Cluster, ZCLDataTypes } = require("zigbee-clusters");

const ATTRIBUTES = {
    // Период обноружения
    x0000: { id: 0x0000, manufacturerId: 0x115F, type: ZCLDataTypes.uint16 },
    x0001: { id: 0x0001, manufacturerId: 0x115F, type: ZCLDataTypes.uint16 },
    // Количество отключений питания
    x0002: { id: 0x0002, manufacturerId: 0x115F, type: ZCLDataTypes.uint16 },
    x0003: { id: 0x0003, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Скорость кнопки
    x0004: { id: 0x0004, manufacturerId: 0x115F, type: ZCLDataTypes.uint16 },
    x0005: { id: 0x0005, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x0006: { id: 0x0006, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    x0007: { id: 0x0007, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    x0008: { id: 0x0008, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    // Режим
    x0009: { id: 0x0009, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Тип
    x000A: { id: 0x000A, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Производитель
    x000B: { id: 0x000B, manufacturerId: 0x115F, type: ZCLDataTypes.string },
    // Событие
    x000C: { id: 0x000C, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    x000D: { id: 0x000D, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x000E: { id: 0x000E, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    x000F: { id: 0x000F, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    x0012: { id: 0x0012, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x0013: { id: 0x0013, manufacturerId: 0x115F, type: ZCLDataTypes.uint16 },
    x0014: { id: 0x0014, manufacturerId: 0x115F, type: ZCLDataTypes.uint16 },
    x0080: { id: 0x0080, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    x0081: { id: 0x0081, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    x00DA: { id: 0x00DA, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x00DB: { id: 0x00DB, manufacturerId: 0x115F, type: ZCLDataTypes.bool },
    x00DC: { id: 0x00DC, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    x00DD: { id: 0x00DD, manufacturerId: 0x115F, type: ZCLDataTypes.uint16 },
    x00DE: { id: 0x00DE, manufacturerId: 0x115F, type: ZCLDataTypes.uint16 },
    x00DF: { id: 0x00DF, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    x00E4: { id: 0x00E4, manufacturerId: 0x115F, type: ZCLDataTypes.uint32 },
    x00E5: { id: 0x00E5, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    x00E6: { id: 0x00E6, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x00E8: { id: 0x00E8, manufacturerId: 0x115F, type: ZCLDataTypes.bool },
    // Подтип
    x00E9: { id: 0x00E9, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x00EA: { id: 0x00EA, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    // Время переключения
    x00EB: { id: 0x00EB, manufacturerId: 0x115F, type: ZCLDataTypes.uint16 },
    x00EC: { id: 0x00EC, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x00ED: { id: 0x00ED, manufacturerId: 0x115F, type: ZCLDataTypes.uint32 },
    // Версия файла
    x00EE: { id: 0x00EE, manufacturerId: 0x115F, type: ZCLDataTypes.uint32 },
    // Инверсия индикатора
    x00F0: { id: 0x00F0, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x00F1: { id: 0x00F1, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x00F2: { id: 0x00F2, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x00F3: { id: 0x00F3, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x00F4: { id: 0x00F4, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x00F5: { id: 0x00F5, manufacturerId: 0x115F, type: ZCLDataTypes.uint32 },
    // Время репортов
    x00F6: { id: 0x00F6, manufacturerId: 0x115F, type: ZCLDataTypes.uint16 },
    // Сводка состояний
    x00F7: { id: 0x00F7, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    x00F8: { id: 0x00F8, manufacturerId: 0x115F, type: ZCLDataTypes.uint64 },
    x00F9: { id: 0x00F9, manufacturerId: 0x115F, type: ZCLDataTypes.uint16 },
    x00FA: { id: 0x00FA, manufacturerId: 0x115F, type: ZCLDataTypes.bool },
    x00FB: { id: 0x00FB, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x00FC: { id: 0x00FC, manufacturerId: 0x115F, type: ZCLDataTypes.bool },
    x00FD: { id: 0x00FD, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Серийный номер
    x00FE: { id: 0x00FE, manufacturerId: 0x115F, type: ZCLDataTypes.string },
    x00FF: { id: 0x00FF, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },


    // ТЕРМОСТАТ
    x024A: { id: 0x024A, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x024E: { id: 0x024E, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Thermostat Control
    x024F: { id: 0x024F, manufacturerId: 0x115F, type: ZCLDataTypes.uint64 },
    x0250: { id: 0x0250, manufacturerId: 0x115F, type: ZCLDataTypes.uint64 },
    x0251: { id: 0x0251, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Thermostat Temperature Correction
    x0252: { id: 0x0252, manufacturerId: 0x115F, type: ZCLDataTypes.single },
    // Thermostat Mute
    x0254: { id: 0x0254, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x0255: { id: 0x0255, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Thermostat Quiet Mode
    x0256: { id: 0x0256, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Thermostat Quiet Period
    x0257: { id: 0x0257, manufacturerId: 0x115F, type: ZCLDataTypes.uint32 },
    x0258: { id: 0x0258, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x0259: { id: 0x0259, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x025A: { id: 0x025A, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x025D: { id: 0x025D, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x025E: { id: 0x025E, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    
    // ТЕРМОГОЛОВКА
    // Калибровка (1 - начать)
    x0270: { id: 0x0270, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Нагрев
    x0271: { id: 0x0271, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Режим работы (0 - ручной, 1 - авто, 2 - антифриз, 3 - настройка)
    x0272: { id: 0x0272, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Обнаружение окна
    x0273: { id: 0x0273, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Проверка клапана
    x0274: { id: 0x0274, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Статус тревоги
    x0275: { id: 0x0275, manufacturerId: 0x115F, type: ZCLDataTypes.uint32 },
    // Данные расписания
    x0276: { id: 0x0276, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    // Блокировка от детей
    x0277: { id: 0x0277, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Температура ухода
    x0279: { id: 0x0279, manufacturerId: 0x115F, type: ZCLDataTypes.uint32 },
    x027A: { id: 0x027A, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Статус калибровки (0 - нет калибровки, 1 - откалиброван)
    x027B: { id: 0x027B, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x027C: { id: 0x027C, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Расписание работы
    x027D: { id: 0x027D, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Статус датчика (0 - нет, 1 - настроен, 2 - ошибка)
    x027E: { id: 0x027E, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    // Тип датчика (0 - внутренний, 1 - внешний)
    x0280: { id: 0x0280, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x0281: { id: 0x0281, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    x0282: { id: 0x0282, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
    x0283: { id: 0x0283, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x0284: { id: 0x0284, manufacturerId: 0x115F, type: ZCLDataTypes.uint8 },
    x029E: { id: 0x029E, manufacturerId: 0x115F, type: ZCLDataTypes.single },

    /**
     *  Расшифровка:
     *    00    - константа,
     *    XX    - действие (01 - чтение, 02 - запись, 05 - репорт),
     *    XX    - счетчик,
     *    XX    - группа ресурса,
     *    XX    - подгруппа ресурса,
     *    XX:XX - атрибут ресурса,
     *    XX    - длина значения,
     *    XX... - значение
     */
    xFFF1: { id: 0xFFF1, manufacturerId: 0x115F, type: ZCLDataTypes.octstr },
};

export class LumiCluster extends Cluster {
    static get ID() {
        return 0xFCC0;
    }

    static get NAME() {
        return "lumi";
    }

    static get ATTRIBUTES() {
        return ATTRIBUTES;
    }
    
    static get COMMANDS() {
        return {};
    }
}