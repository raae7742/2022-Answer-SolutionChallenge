package com.answer.notinote.Search.service;

import com.answer.notinote.Auth.token.provider.JwtTokenProvider;
import com.answer.notinote.Child.domain.Child;
import com.answer.notinote.Child.domain.repository.ChildRepository;
import com.answer.notinote.Event.domain.Event;
import com.answer.notinote.Event.service.EventService;
import com.answer.notinote.Exception.CustomException;
import com.answer.notinote.Exception.ErrorCode;
import com.answer.notinote.Notice.domain.entity.Notice;
import com.answer.notinote.Notice.domain.repository.NoticeRepository;
import com.answer.notinote.Notice.dto.NoticeSentenceDto;
import com.answer.notinote.Notice.service.NoticeService;
import com.answer.notinote.Search.dto.SearchSavedListDto;
import com.answer.notinote.Search.dto.SearchListDto;
import com.answer.notinote.Search.dto.SearchResultDetailDto;
import com.answer.notinote.User.domain.entity.User;
import com.answer.notinote.User.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class SearchService {
    @Autowired
    NoticeRepository noticeRepository;
    @Autowired
    EventService eventService;
    @Autowired
    NoticeService noticeService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ChildRepository childRepository;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    public List<SearchListDto> searchList(HttpServletRequest request) {

        String token = jwtTokenProvider.resolveAccessToken(request);
        String userEmail = jwtTokenProvider.getUserEmail(token);
        User user = userRepository.findByUemail(userEmail).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        List<Notice> notices = noticeRepository.findByUser(user);

        List<LocalDate> dateList = new ArrayList<>();
        List<SearchListDto> saved = new ArrayList<>();

        //유니크한 날짜값만 리스트에 저장하는 jpa 쿼리 메소드
        for (int i = 0; i < noticeRepository.findUniqueNdate(user).size(); i++) {
            dateList.add(noticeRepository.findUniqueNdate(user).get(i).getNdate());
        }

        dateList.sort(Comparator.reverseOrder()); //최신순 정렬

        for (int i = 0; i < dateList.size(); i++) {
            List<SearchSavedListDto> savedLists = new ArrayList<>();
            for (int j = 0; j < notices.size(); j++) {
                if ((notices.get(j).getNdate()).equals(dateList.get(i))) {
                    SearchSavedListDto searchSavedListDto = SearchSavedListDto.builder()
                            .nid(notices.get(j).getNid())
                            .cid(notices.get(j).getChild().getCid())
                            .title(notices.get(j).getTitle())
                            .build();
                    savedLists.add(searchSavedListDto);
                }
            }
            Comparator<SearchSavedListDto> comparingCid = Comparator.comparing(SearchSavedListDto::getCid, Comparator.naturalOrder()); //cid별 오름차순 정렬
            savedLists = savedLists.stream().sorted(comparingCid).collect(Collectors.toList());

            SearchListDto searchListDto = SearchListDto.builder()
                    .date(dateList.get(i))
                    .saved(savedLists)
                    .build();
            saved.add(searchListDto);
        }

        return saved;
    }

    public SearchResultDetailDto searchDetailList(Long nid, HttpServletRequest request) {

        Notice notice = noticeRepository.findByNid(nid);
        List<Event> events = eventService.findAllByNotice(notice);
        List<NoticeSentenceDto> fullText = noticeService.extractSentenceFromEvent(notice.getTrans_full(), events);

        SearchResultDetailDto searchResultDetailDto = SearchResultDetailDto.builder()
                .imageUri(notice.getNimageurl())
                .fullText(fullText)
                .korean(notice.getOrigin_full())
                .build();

        return searchResultDetailDto;

    }

    public List<SearchListDto> searchChildList(Long cid, HttpServletRequest request) {

        String token = jwtTokenProvider.resolveAccessToken(request);
        String useremail = jwtTokenProvider.getUserEmail(token);
        User user = userRepository.findByUemail(useremail).orElseThrow(IllegalArgumentException::new);
        Child child = childRepository.findById(cid).orElseThrow(IllegalArgumentException::new);
        List<Notice> notices = noticeRepository.findByUserAndChild(user, child);

        List<LocalDate> dateList = new ArrayList<>();
        List<SearchListDto> saved = new ArrayList<>();

        //유니크한 날짜값만 리스트에 저장하는 jpa 쿼리 메소드
        for (int i = 0; i < noticeRepository.findUniqueNdate(user).size(); i++) {
            dateList.add(noticeRepository.findUniqueNdate(user).get(i).getNdate());
        }

        dateList.sort(Comparator.reverseOrder()); //최신순 정렬

        for (int i = 0; i < dateList.size(); i++) {
            List<SearchSavedListDto> savedLists = new ArrayList<>();
            for (int j = 0; j < notices.size(); j++) {
                if ((notices.get(j).getNdate()).equals(dateList.get(i))) {
                    SearchSavedListDto searchSavedListDto = SearchSavedListDto.builder()
                            .nid(notices.get(j).getNid())
                            .cid(notices.get(j).getChild().getCid())
                            .title(notices.get(j).getTitle())
                            .build();
                    savedLists.add(searchSavedListDto);
                }
            }

            //리스트가 널이면 날짜값도 보이지 않게 함
            if (!savedLists.isEmpty()){
                SearchListDto searchListDto = SearchListDto.builder()
                        .date(dateList.get(i))
                        .saved(savedLists)
                        .build();
                saved.add(searchListDto);
            }
        }
        return saved ;
    }
}


