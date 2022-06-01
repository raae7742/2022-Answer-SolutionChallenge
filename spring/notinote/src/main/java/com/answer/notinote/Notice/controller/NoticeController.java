package com.answer.notinote.Notice.controller;

import com.answer.notinote.Auth.token.provider.JwtTokenProvider;
import com.answer.notinote.Event.dto.EventRequestDto;
import com.answer.notinote.Event.service.EventService;
import com.answer.notinote.Notice.dto.*;
import com.answer.notinote.Notice.service.NoticeService;
import com.answer.notinote.User.domain.entity.User;
import com.answer.notinote.User.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;


@RestController
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    private final UserService userService;

    private final JwtTokenProvider jwtTokenProvider;

    private final EventService eventService;

    @RequestMapping(value = "/notice/ocr", method = RequestMethod.POST)
    public NoticeOCRDto executeOCR (@RequestPart MultipartFile uploadfile, HttpServletRequest request) throws IOException {
        String token = jwtTokenProvider.resolveAccessToken(request);
        String email = jwtTokenProvider.getUserEmail(token);
        User user = userService.findUserByEmail(email);
        String targetLanguage = user.getUlanguage();

        String korean = noticeService.detectText(uploadfile); //원문 추출
        String trans_full = noticeService.transText(korean, targetLanguage); //번역문 추출
        String en_full = noticeService.englishText(korean); // 영어 추출
        List<EventRequestDto> eventWords = noticeService.detectEvent(korean, trans_full, targetLanguage, en_full); //이벤트 추출
        List<NoticeSentenceDto> fullText = noticeService.extractSentenceFromEventRequestDto(trans_full, eventWords);
        List<NoticeEventListDto> events = noticeService.extractEventList(fullText);
        Integer event_num = events.size();
        return new NoticeOCRDto(korean, trans_full, fullText, event_num, events);
    }

    @RequestMapping(value = "/notice/save", method = RequestMethod.POST)
    public NoticeTitleListDto saveNotice(
            @RequestPart(value = "uploadfile") MultipartFile uploadfile,
            @RequestPart(value = "noticeRequestDto") String noticeRequestDto,
            HttpServletRequest request) throws IOException, ParseException {
        ObjectMapper mapper = new ObjectMapper();
        NoticeRequestDto requestDto = mapper.readValue(noticeRequestDto, NoticeRequestDto.class);

        /*
        LocalDate date = LocalDate.parse(stringdate);
        NoticeRequestDto noticeRequestDto = NoticeRequestDto.builder()
                .title(title)
                .date(date)
                .korean(korean)
                .fullText(fullText)
                .build();

         */
        NoticeTitleListDto notice_title = noticeService.saveNotice(uploadfile, requestDto, request); //notice 저장
        return notice_title;
    }
/*
    @PostMapping("/notice/test")
    public List<NoticeSentenceDto> test(@RequestBody NoticeOCRDto dto, @RequestParam String lan) throws JsonProcessingException {
        Notice notice = Notice.builder()
                .trans_full(dto.getFullText())
                .origin_full(dto.getKorean())
                .build();
        List<Event> events = noticeService.detectEvent(notice, lan);
        return noticeService.extractSentenceFromEvent(dto.getFullText(), events);
    }

 */
}
